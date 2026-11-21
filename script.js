document.addEventListener("DOMContentLoaded", () => {
    // 1. Etkileşim: Karanlık Mod (Dark Mode) ve Tercih Kaydı
    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.textContent = "☀️ Aydınlık";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.textContent = isDark ? "☀️ Aydınlık" : "🌙 Karanlık";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // 2. Etkileşim: Mobil Menü Açma/Kapama
    const menuBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", isOpen);
        });
    }

    // 3. ve 4. Etkileşim: Projeler Sayfasında Arama ve Kategori Filtreleme
    const searchInput = document.getElementById("project-search");
    const categorySelect = document.getElementById("project-category");
    const projectCards = document.querySelectorAll(".project-card");

    function filterProjects() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const category = categorySelect ? categorySelect.value : "all";

        projectCards.forEach((card) => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector("p").textContent.toLowerCase();
            const cardCat = card.getAttribute("data-category");

            const matchesSearch = title.includes(query) || desc.includes(query);
            const matchesCategory = category === "all" || cardCat === category;

            card.style.display = matchesSearch && matchesCategory ? "flex" : "none";
        });
    }

    if (searchInput) searchInput.addEventListener("input", filterProjects);
    if (categorySelect) categorySelect.addEventListener("change", filterProjects);

    // 5. Etkileşim: İletişim Formu Doğrulama ve Geri Bildirim
    const contactForm = document.getElementById("contact-form");
    const feedbackBox = document.getElementById("form-feedback");

    if (contactForm && feedbackBox) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name.length < 2) {
                showFeedback("Lütfen en az 2 karakterlik bir ad giriniz.", "error");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                showFeedback("Lütfen geçerli bir e-posta adresi giriniz.", "error");
                return;
            }

            if (message.length < 10) {
                showFeedback("Mesajınız en az 10 karakter uzunluğunda olmalıdır.", "error");
                return;
            }

            showFeedback(`Teşekkürler ${name}! Mesajınız başarıyla doğrulandı ve alındı.`, "success");
            contactForm.reset();
        });
    }

    function showFeedback(text, type) {
        feedbackBox.textContent = text;
        feedbackBox.className = `form-feedback ${type}`;
    }
});