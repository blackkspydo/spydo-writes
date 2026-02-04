<script lang="ts">
	const STORAGE_KEY = 'preferred-code-language'

	const LANGUAGE_LABELS: Record<string, string> = {
		js: 'JavaScript',
		javascript: 'JavaScript',
		ts: 'TypeScript',
		typescript: 'TypeScript',
		py: 'Python',
		python: 'Python',
		html: 'HTML',
		css: 'CSS',
		bash: 'Bash',
		sh: 'Shell',
		json: 'JSON',
		sql: 'SQL',
		go: 'Go',
		rust: 'Rust',
		java: 'Java',
		ruby: 'Ruby',
		php: 'PHP',
		swift: 'Swift',
		kotlin: 'Kotlin',
		c: 'C',
		cpp: 'C++',
	}

	function getLabel(lang: string): string {
		return LANGUAGE_LABELS[lang] || lang
	}

	function getPreferredLanguage(): string | null {
		try {
			return localStorage.getItem(STORAGE_KEY)
		} catch {
			return null
		}
	}

	function setPreferredLanguage(lang: string): void {
		try {
			localStorage.setItem(STORAGE_KEY, lang)
		} catch {
			// localStorage unavailable
		}
	}

	function getLanguagesInGroup(container: HTMLElement): string[] {
		const panels = container.querySelectorAll<HTMLElement>('.codetab-panel')
		const languages: string[] = []
		panels.forEach((panel) => {
			const lang = panel.dataset.lang
			if (lang && !languages.includes(lang)) languages.push(lang)
		})
		return languages
	}

	function switchTab(container: HTMLElement, targetLang: string): void {
		const panels = container.querySelectorAll<HTMLElement>('.codetab-panel')
		const buttons = container.querySelectorAll<HTMLButtonElement>('.codetab-button')

		panels.forEach((panel) => {
			const isActive = panel.dataset.lang === targetLang
			panel.hidden = !isActive
		})

		buttons.forEach((btn) => {
			const isActive = btn.dataset.lang === targetLang
			btn.classList.toggle('active', isActive)
			btn.setAttribute('aria-selected', String(isActive))
		})
	}

	function handleKeydown(e: KeyboardEvent, tabBar: HTMLElement, container: HTMLElement, allContainers: NodeListOf<HTMLElement>): void {
		const currentButton = e.target as HTMLButtonElement
		if (!currentButton.classList.contains('codetab-button')) return

		const buttons = Array.from(tabBar.querySelectorAll<HTMLButtonElement>('.codetab-button'))
		const currentIndex = buttons.indexOf(currentButton)
		let nextIndex = currentIndex

		switch (e.key) {
			case 'ArrowLeft':
				nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1
				break
			case 'ArrowRight':
				nextIndex = currentIndex === buttons.length - 1 ? 0 : currentIndex + 1
				break
			case 'Home':
				nextIndex = 0
				break
			case 'End':
				nextIndex = buttons.length - 1
				break
			default:
				return
		}

		e.preventDefault()
		buttons[nextIndex].focus()
		buttons[nextIndex].click()
	}

	function initializeCodeTabs(): (() => void) | undefined {
		const containers = document.querySelectorAll<HTMLElement>('[data-codetabs-group]')
		if (containers.length === 0) return

		const preferredLang = getPreferredLanguage()
		const cleanups: (() => void)[] = []

		containers.forEach((container) => {
			// Skip if already initialized
			if (container.querySelector('.codetabs-bar')) return

			const languages = getLanguagesInGroup(container)
			if (languages.length === 0) return

			let activeLang = languages[0]
			if (preferredLang && languages.includes(preferredLang)) {
				activeLang = preferredLang
			}

			// Create tab bar
			const tabBar = document.createElement('div')
			tabBar.className = 'codetabs-bar'
			tabBar.setAttribute('role', 'tablist')

			languages.forEach((lang) => {
				const button = document.createElement('button')
				button.className = 'codetab-button'
				button.textContent = getLabel(lang)
				button.dataset.lang = lang
				button.setAttribute('role', 'tab')
				tabBar.appendChild(button)
			})

			container.insertBefore(tabBar, container.firstChild)

			// Click handler
			const handleClick = (e: Event) => {
				const button = (e.target as HTMLElement).closest<HTMLButtonElement>('.codetab-button')
				if (!button) return

				const lang = button.dataset.lang
				if (!lang) return

				switchTab(container, lang)
				setPreferredLanguage(lang)

				// Sync other groups on the page
				containers.forEach((other) => {
					if (other === container) return
					const otherLangs = getLanguagesInGroup(other)
					if (otherLangs.includes(lang)) {
						switchTab(other, lang)
					}
				})
			}

			// Keyboard handler
			const handleKeys = (e: Event) => handleKeydown(e as KeyboardEvent, tabBar, container, containers)

			tabBar.addEventListener('click', handleClick)
			tabBar.addEventListener('keydown', handleKeys)

			cleanups.push(() => {
				tabBar.removeEventListener('click', handleClick)
				tabBar.removeEventListener('keydown', handleKeys)
			})

			// Set initial state
			switchTab(container, activeLang)
		})

		return () => cleanups.forEach((fn) => fn())
	}

	$effect(() => {
		const cleanup = initializeCodeTabs()
		return cleanup
	})
</script>
