   const container = document.getElementById('container');
    document.querySelector('.register-btn').addEventListener('click', () => container.classList.add('active'));
    document.querySelector('.login-btn').addEventListener('click', () => container.classList.remove('active'));

    function showToast(msg, icon = 'bx-check-circle') {
        const t = document.getElementById('toast');
        t.querySelector('i').className = `bx ${icon}`;
        document.getElementById('toastMsg').textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    }

    function togglePass(toggleId, inputId) {
        document.getElementById(toggleId).addEventListener('click', function() {
            const inp = document.getElementById(inputId);
            const show = inp.type === 'password';
            inp.type = show ? 'text' : 'password';
            this.className = show ? 'bx bxs-show' : 'bx bxs-lock-alt';
            this.style.color = show ? 'var(--primary)' : '';
        });
    }

    togglePass('tLP', 'lPass');
    togglePass('tRP', 'rPass');

    document.getElementById('rPass').addEventListener('input', function() {
        const v = this.value;
        let score = [v.length >= 8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
        const colors = ['', '#ef4444', '#f59e0b', '#10b981', '#10b981'];
        document.querySelectorAll('#strengthBars span').forEach((bar, i) => {
            bar.style.background = i < score ? colors[score] : 'var(--border)';
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Đăng nhập thành công! 🎉');
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('[type=email]').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('Email không hợp lệ!', 'bx-error-circle');
        if (document.getElementById('rPass').value.length < 6) return showToast('Mật khẩu tối thiểu 6 ký tự!', 'bx-error-circle');
        showToast('Đăng ký thành công! 🥳');
    });