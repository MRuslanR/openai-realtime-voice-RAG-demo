// Система уведомлений и улучшенных логов
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.toasts = new Set();
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 5000, title = null) {
        const toast = this.createToast(message, type, title);
        this.container.appendChild(toast);
        this.toasts.add(toast);

        // Автоматическое удаление
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    createToast(message, type, title) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = this.getIcon(type);
        const displayTitle = title || this.getDefaultTitle(type);

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${displayTitle}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="notifications.remove(this.parentElement)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success-color)">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>`,
            error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--error-color)">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning-color)">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--info-color)">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`
        };
        return icons[type] || icons.info;
    }

    getDefaultTitle(type) {
        const titles = {
            success: '✅ Успешно',
            error: '❌ Ошибка',
            warning: '⚠️ Предупреждение',
            info: 'ℹ️ Информация'
        };
        return titles[type] || 'Уведомление';
    }

    remove(toast) {
        if (this.toasts.has(toast)) {
            toast.style.animation = 'slideInRight 0.3s reverse';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
                this.toasts.delete(toast);
            }, 300);
        }
    }

    clear() {
        this.toasts.forEach(toast => this.remove(toast));
    }

    // Методы для разных типов уведомлений
    success(message, title = null, duration = 5000) {
        return this.show(message, 'success', duration, title);
    }

    error(message, title = null, duration = 8000) {
        return this.show(message, 'error', duration, title);
    }

    warning(message, title = null, duration = 6000) {
        return this.show(message, 'warning', duration, title);
    }

    info(message, title = null, duration = 5000) {
        return this.show(message, 'info', duration, title);
    }
}

// Улучшенная система логирования для пользователей
class UserLogger {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.maxLogs = 50;
    }

    log(message, type = 'info', details = null) {
        const logEntry = this.createLogEntry(message, type, details);
        
        // Добавляем в начало контейнера
        if (this.container.firstChild) {
            this.container.insertBefore(logEntry, this.container.firstChild);
        } else {
            this.container.appendChild(logEntry);
        }

        // Ограничиваем количество логов
        while (this.container.children.length > this.maxLogs) {
            this.container.removeChild(this.container.lastChild);
        }

        // Автоскролл к новому сообщению
        this.container.scrollTop = 0;
    }

    createLogEntry(message, type, details) {
        const entry = document.createElement('div');
        entry.className = `message message--${type}`;
        
        const timestamp = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const icon = this.getMessageIcon(type);
        const userFriendlyMessage = this.makeMessageUserFriendly(message, type);

        entry.innerHTML = `
            <div class="message-icon">${icon}</div>
            <div class="message-content">
                <div class="message-time">${timestamp}</div>
                <p>${userFriendlyMessage}</p>
                ${details ? `<div class="message-details">${details}</div>` : ''}
            </div>
        `;

        return entry;
    }

    getMessageIcon(type) {
        const icons = {
            success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>`,
            error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            'function-call': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
            </svg>`,
            info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`,
            system: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M10 4v4"></path>
                <path d="M14 4v4"></path>
                <path d="M4 8v8"></path>
                <path d="M20 8v8"></path>
            </svg>`
        };
        return icons[type] || icons.info;
    }

    makeMessageUserFriendly(message, type) {
        // Словарь для перевода технических сообщений в понятные пользователю
        const friendlyMessages = {
            // Подключение
            'Микрофон включён': '🎤 Микрофон активирован',
            'Канал для обмена данными открыт.': '🔗 Соединение с ассистентом установлено',
            'Получен аудиотрек ассистента': '🔊 Готов к воспроизведению ответов ассистента',
            'Соединение с ассистентом установлено. Можете начинать говорить.': '✅ Всё готово! Начинайте разговор с ассистентом',
            'Сессия завершена.': '👋 Разговор с ассистентом завершён',
            
            // База знаний
            'Вызов функции поиска по базе знаний...': '🔍 Ищу информацию в ваших документах...',
            'Результаты kb_search': '📚 Найдена информация в документах',
            
            // Ошибки
            'Критическая ошибка при подключении.': '❌ Не удалось подключиться к ассистенту. Проверьте интернет-соединение',
            'Ошибка DataChannel': '⚠️ Проблема с передачей данных',
            'Канал для обмена данными закрыт.': 'ℹ️ Соединение разорвано',
        };

        return friendlyMessages[message] || message;
    }

    // Удобные методы для разных типов логов
    success(message, details = null) {
        this.log(message, 'success', details);
    }

    error(message, details = null) {
        this.log(message, 'error', details);
    }

    warning(message, details = null) {
        this.log(message, 'warning', details);
    }

    info(message, details = null) {
        this.log(message, 'info', details);
    }

    system(message, details = null) {
        this.log(message, 'system', details);
    }

    functionCall(message, details = null) {
        this.log(message, 'function-call', details);
    }

    clear() {
        this.container.innerHTML = '';
    }
}

// Глобальные экземпляры
const notifications = new NotificationSystem();

// Экспортируем для использования в других файлах
if (typeof window !== 'undefined') {
    window.notifications = notifications;
    window.UserLogger = UserLogger;
}