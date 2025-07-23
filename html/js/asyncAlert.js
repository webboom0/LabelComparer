/**
 * Async/Await 지원 Alert 시스템 (SweetAlert2 스타일)
 */
class AsyncAlert {
  constructor() {
    this.init();
  }

  init() {
    this.addStyles();
  }

  addStyles() {
    // CSS는 별도 파일로 분리되었으므로 여기서는 스타일 추가하지 않음
    // asyncAlert.css 파일을 HTML에서 로드해야 함
  }

  createAlert(options = {}) {
    const defaultOptions = {
      title: '',
      text: '',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      confirmButtonColor: 'primary',
      cancelButtonColor: 'cancel',
      input: false,
      inputPlaceholder: '',
      inputValue: '',
      inputType: 'text',
      showLoaderOnConfirm: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      ...options
    };

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'async-alert-overlay';

      const iconMap = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
        question: '?'
      };

      const icon = iconMap[defaultOptions.icon] || iconMap.info;

      overlay.innerHTML = `
        <div class="async-alert">
          <div class="async-alert-header">
            <div class="async-alert-icon ${defaultOptions.icon}">${icon}</div>
            <h3 class="async-alert-title">${defaultOptions.title}</h3>
            <p class="async-alert-text">${defaultOptions.text}</p>
          </div>
          <div class="async-alert-body">
            ${defaultOptions.input ? `
              <input type="${defaultOptions.inputType}" 
                     class="async-alert-input" 
                     placeholder="${defaultOptions.inputPlaceholder}"
                     value="${defaultOptions.inputValue}">
            ` : ''}
          </div>
          <div class="async-alert-footer">
            ${defaultOptions.showCancelButton ? `
              <button class="async-alert-btn ${defaultOptions.cancelButtonColor} cancel-btn">
                ${defaultOptions.cancelButtonText}
              </button>
            ` : ''}
            <button class="async-alert-btn ${defaultOptions.confirmButtonColor} confirm-btn">
              ${defaultOptions.showLoaderOnConfirm ? '<span class="async-alert-loading"></span>' : ''}
              ${defaultOptions.confirmButtonText}
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      // 애니메이션 시작
      setTimeout(() => overlay.classList.add('show'), 10);

      const confirmBtn = overlay.querySelector('.confirm-btn');
      const cancelBtn = overlay.querySelector('.cancel-btn');
      const input = overlay.querySelector('.async-alert-input');

      const closeAlert = (result) => {
        overlay.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(overlay);
          resolve(result);
        }, 300);
      };

      // 확인 버튼 클릭
      confirmBtn.addEventListener('click', () => {
        if (defaultOptions.input) {
          closeAlert({ isConfirmed: true, value: input.value });
        } else {
          closeAlert({ isConfirmed: true });
        }
      });

      // 취소 버튼 클릭
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          closeAlert({ isConfirmed: false });
        });
      }

      // Enter 키 (확인)
      const handleKeydown = (e) => {
        if (e.key === 'Enter') {
          if (defaultOptions.input) {
            closeAlert({ isConfirmed: true, value: input.value });
          } else {
            closeAlert({ isConfirmed: true });
          }
        } else if (e.key === 'Escape' && defaultOptions.allowEscapeKey) {
          closeAlert({ isConfirmed: false });
        }
      };

      document.addEventListener('keydown', handleKeydown);

      // 외부 클릭
      if (defaultOptions.allowOutsideClick) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            closeAlert({ isConfirmed: false });
          }
        });
      }

      // 입력 필드 포커스
      if (input) {
        input.focus();
        input.select();
      }

      // 정리 함수
      const cleanup = () => {
        document.removeEventListener('keydown', handleKeydown);
      };

      // Promise가 해결될 때 정리
      overlay.addEventListener('transitionend', cleanup, { once: true });
    });
  }

  // 편의 메서드들
  async fire(options) {
    return await this.createAlert(options);
  }

  async success(title, text = '') {
    return await this.createAlert({ title, text, icon: 'success' });
  }

  async error(title, text = '') {
    return await this.createAlert({ title, text, icon: 'error' });
  }

  async warning(title, text = '') {
    return await this.createAlert({ title, text, icon: 'warning' });
  }

  async info(title, text = '') {
    return await this.createAlert({ title, text, icon: 'info' });
  }

  async question(title, text = '') {
    return await this.createAlert({ title, text, icon: 'question' });
  }

  async confirm(title, text = '') {
    return await this.createAlert({
      title,
      text,
      icon: 'question',
      showCancelButton: true
    });
  }

  async prompt(title, text = '', placeholder = '') {
    return await this.createAlert({
      title,
      text,
      icon: 'question',
      input: true,
      inputPlaceholder: placeholder,
      showCancelButton: true
    });
  }
}

// 전역 인스턴스 생성
const asyncAlert = new AsyncAlert();