// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Show splash screen for 3 seconds
  const splashScreen = document.getElementById("splash-screen")
  const appContainer = document.getElementById("app-container")

  setTimeout(() => {
    splashScreen.classList.add("hidden")
    setTimeout(() => {
      splashScreen.style.display = "none"
      showScreen("home-screen")
    }, 500)
  }, 3000)

  // Navigation functionality
  const navItems = document.querySelectorAll(".nav-item")
  const actionCards = document.querySelectorAll(".action-card")
  const backButtons = document.querySelectorAll(".back-btn")

  // Handle bottom navigation
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const screenId = item.dataset.screen
      showScreen(screenId)

      // Update active state
      navItems.forEach((nav) => nav.classList.remove("active"))
      item.classList.add("active")
    })
  })

  // Handle action cards
  actionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const screenId = card.dataset.screen
      showScreen(screenId)

      // Update nav active state
      navItems.forEach((nav) => nav.classList.remove("active"))
      const correspondingNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`)
      if (correspondingNav) {
        correspondingNav.classList.add("active")
      }
    })
  })

  // Handle back buttons
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showScreen("home-screen")

      // Update nav active state
      navItems.forEach((nav) => nav.classList.remove("active"))
      const homeNav = document.querySelector('.nav-item[data-screen="home-screen"]')
      if (homeNav) {
        homeNav.classList.add("active")
      }
    })
  })

  // Filter tabs functionality
  const filterTabs = document.querySelectorAll(".filter-tab")
  const alertCards = document.querySelectorAll(".alert-card[data-type]")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter

      // Update active tab
      filterTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      // Filter alerts
      alertCards.forEach((card) => {
        if (filter === "all" || card.dataset.type === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Message input functionality
  const messageInput = document.querySelector(".message-input")
  const sendBtn = document.querySelector(".send-btn")

  if (sendBtn && messageInput) {
    sendBtn.addEventListener("click", () => {
      const message = messageInput.value.trim()
      if (message) {
        addMessage(message)
        messageInput.value = ""
      }
    })

    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const message = messageInput.value.trim()
        if (message) {
          addMessage(message)
          messageInput.value = ""
        }
      }
    })
  }

  // Notification button
  const notificationBtn = document.getElementById("notification-btn")
  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      alert(
        "Você tem 3 notificações:\n\n1. Alerta de maré alta em Praia do Forte\n2. Nova mensagem na comunidade\n3. Condições favoráveis em Copacabana",
      )
    })
  }

  // Toggle switches
  const toggleSwitches = document.querySelectorAll(".toggle-switch input")
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", (e) => {
      const label = e.target.closest(".setting-item").querySelector(".setting-label").textContent
      const status = e.target.checked ? "ativadas" : "desativadas"
      console.log(`[v0] ${label} ${status}`)
    })
  })

  // Logout button
  const logoutBtn = document.querySelector(".logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja sair?")) {
        alert("Logout realizado com sucesso!")
        showScreen("home-screen")
      }
    })
  }

  // Map pins interaction
  const mapPins = document.querySelectorAll(".map-pin")
  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      pin.style.transform = "scale(1.2)"
      setTimeout(() => {
        pin.style.transform = "scale(1)"
      }, 300)
    })
  })

  // Message actions (like/comment)
  const messageActions = document.querySelectorAll(".message-action")
  messageActions.forEach((action) => {
    action.addEventListener("click", (e) => {
      const button = e.currentTarget
      const countSpan = button.querySelector("span")
      const currentCount = Number.parseInt(countSpan.textContent)

      // Toggle like/comment
      button.style.color = button.style.color === "rgb(65, 147, 166)" ? "" : "rgb(65, 147, 166)"
      countSpan.textContent = button.style.color ? currentCount + 1 : currentCount - 1
    })
  })
})

// Helper function to show screens
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen")
  screens.forEach((screen) => {
    screen.classList.remove("active")
  })

  const targetScreen = document.getElementById(screenId)
  if (targetScreen) {
    targetScreen.classList.add("active")
  }
}

// Helper function to add new message
function addMessage(text) {
  const messagesList = document.querySelector(".messages-list")
  if (!messagesList) return

  const messageCard = document.createElement("div")
  messageCard.className = "message-card"
  messageCard.style.animation = "slideIn 0.3s ease"

  const initials = "VC" // Você
  const now = new Date()
  const timeStr = "Agora"

  messageCard.innerHTML = `
    <div class="message-avatar">${initials}</div>
    <div class="message-content">
      <div class="message-header">
        <span class="message-author">Você</span>
        <span class="message-time">${timeStr}</span>
      </div>
      <p>${text}</p>
      <div class="message-actions">
        <button class="message-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span>0</span>
        </button>
        <button class="message-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>0</span>
        </button>
      </div>
    </div>
  `

  messagesList.insertBefore(messageCard, messagesList.firstChild)

  // Add event listeners to new message actions
  const newActions = messageCard.querySelectorAll(".message-action")
  newActions.forEach((action) => {
    action.addEventListener("click", (e) => {
      const button = e.currentTarget
      const countSpan = button.querySelector("span")
      const currentCount = Number.parseInt(countSpan.textContent)

      button.style.color = button.style.color === "rgb(65, 147, 166)" ? "" : "rgb(65, 147, 166)"
      countSpan.textContent = button.style.color ? currentCount + 1 : currentCount - 1
    })
  })
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
