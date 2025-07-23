// 상단이동
const moveTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// dialog
const dialog = {
  target: null,
  open(target) {
    dialog.target = target;
    document.querySelector("body").classList.add("scroll-hdn");
    document.querySelector(target).classList.add("open");
    document.querySelector(target).setAttribute("tabindex", "0");
    document.querySelector(target).focus();
    document.querySelectorAll(".dialog").forEach(function (val, idx) {
      val.addEventListener("click", dialog.handler);
    });
  },
  close(target) {
    dialog.target = target;
    document.querySelector("body").classList.remove("scroll-hdn");
    document.querySelector(target).classList.remove("open");
    document.querySelector(target).removeAttribute("tabindex");
    document.querySelectorAll(".dialog").forEach(function (val, idx) {
      val.removeEventListener("click", dialog.handler);
    });
  },
  full(e, target) {
    dialog.target = target;

    if (e.classList.contains("toggle")) {
      document.querySelector(target).classList.remove("dialog-full");
      e.classList.remove("toggle");
      e.querySelector("span").textContent = "기본화면으로 보기";
    } else {
      document.querySelector(target).classList.add("dialog-full");
      e.classList.add("toggle");
      e.querySelector("span").textContent = "전체화면으로 보기";
    }
  },
  handler: function (e) {
    if (!e.target.closest(".inner")) {
      dialog.close(dialog.target);
    }
  },
};


document.addEventListener('DOMContentLoaded', function () {
  // 구독상품 선택 (라디오 버튼)
  const productRadios = document.querySelectorAll('input[name="product"]');
  const productItem = document.querySelector('.product-item');

  // 라디오 버튼이 존재할 때만 이벤트 리스너 추가
  if (productRadios.length > 0) {
    productRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        // product-item이 존재할 때만 내용 업데이트
        if (productItem) {
          // 라디오 버튼의 부모 요소에서 label 찾기
          const btnSelect = this.closest('.btn-select');

          if (btnSelect) {
            const label = btnSelect.querySelector('label');

            if (label) {
              const subjTxt = label.querySelector('.subj .txt').textContent;
              const priceElement = label.querySelector('.price-group strong');
              const smallText = priceElement.querySelector('.small').textContent;
              const priceText = priceElement.querySelector('.price').textContent;

              // product-item의 label과 price 업데이트
              const labelElement = productItem.querySelector('.label');
              const smallElement = productItem.querySelector('.price-group .small');
              const priceElement2 = productItem.querySelector('.price-group .price');

              if (labelElement) labelElement.textContent = subjTxt;
              if (smallElement) smallElement.textContent = smallText;
              if (priceElement2) priceElement2.textContent = priceText;
            }
          }
        }
      });
    });
  }

  // 전체 동의 버튼 클릭 이벤트
  const btnAllAgree = document.querySelector('.btn-all-agree');
  const checkboxes = document.querySelectorAll('.list-group input[type="checkbox"]');

  // btnAllAgree가 존재할 때만 이벤트 리스너 추가
  if (btnAllAgree) {
    btnAllAgree.addEventListener('click', function () {
      // 버튼의 active 클래스 토글
      this.classList.toggle('active');

      // 체크박스들의 상태를 버튼의 active 상태에 맞춰 설정
      const isActive = this.classList.contains('active');
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = isActive;
      });
    });
  }

  // 개별 체크박스 변경 시 전체 동의 버튼 상태 업데이트
  if (checkboxes.length > 0 && btnAllAgree) {
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        const checkedCount = document.querySelectorAll('.list-group input[type="checkbox"]:checked').length;
        const totalCount = checkboxes.length;

        // 모든 체크박스가 체크되었으면 버튼에 active 클래스 추가
        if (checkedCount === totalCount) {
          btnAllAgree.classList.add('active');
        } else {
          btnAllAgree.classList.remove('active');
        }
      });
    });
  }
});
