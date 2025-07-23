/****** [ gnb ] ******/
const gnb = {
  mode: "pc", // 해상도 모드 변수
  gnbEl: "#gnb", // gnb 요소 선택자 변수
  depth: [".depth-1", ".depth-2"], // depth별 링크 선택자 배열 지정
  maxWidth: 150,
  maxHeight: 0,
  dep2WdArr: [],
  dep2HeightArr: [],
  gnbWidth: 1100,
  init: function () {
    const gnbElement = document.querySelector(this.gnbEl);
  },
  close: function () {
    document.body.classList.remove("sideMenuOpen");
    document.querySelector(".modal-box").remove();
  },
  reset: function () {
    console.log("reset");
    const gnbElement = document.querySelector(this.gnbEl);
    gnbElement
      .querySelectorAll(".open")
      .forEach((el) => el.classList.remove("open"));

    document
      .querySelectorAll(".allMenuBtn")
      .forEach((el) => el.classList.remove("toggle"));
    document.querySelectorAll("#gnb .etcMenu").forEach((el) => el.remove());

    if(document.querySelector(".modal-box")){
      document.querySelector(".modal-box").remove();
    }

    if(document.querySelector(".sideMenuOpen")){
      document.body.classList.remove("sideMenuOpen");
    }
  },
  addModal: function (contain) {
    if (document.querySelectorAll(".modal-box").length <= 0) {
      const modal = document.createElement("div");
      modal.classList.add("modal-box")
      modal.addEventListener("click", function () {
        gnb.close();
      });
      document.querySelector(contain).append(modal);
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // gnb 메뉴 활성화
  gnb.init();

  // 사이드 메뉴 활성화
  document.querySelectorAll(".sideMenuBtn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      document.body.classList.add("sideMenuOpen");
      gnb.addModal(".header");
      document.querySelectorAll("#gnb .etcMenu").forEach((el) => el.remove());
      const etcMenu = document.querySelector(".header .etcMenu");
      if (etcMenu) {
        const clone = etcMenu.cloneNode(true);
        document.querySelector("#gnb").prepend(clone);
      }
    });
  });

  windowRsize();
  // window resize 해상도가 변경될 때
  window.addEventListener("resize", function () {
    windowRsize();
  });

  function windowRsize() {
    if (window.matchMedia("screen and (max-width: 780px)").matches) {
      document.body.classList.add("mode-mobile");
      gnb.mode = "mobile";
    }else{
      document.body.classList.remove("mode-mobile");
      gnb.mode = "pc";
      gnb.reset();
    }
    
  }
})