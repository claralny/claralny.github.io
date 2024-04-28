var mobile = false;
var touch = false;

var tilt = false;
var tiltChecked = false;
var tiltVal = -1;

// var root = "/beta/hervisions";
var root = "";

var current_page = "/";
var about_open = false;
var project_solo = false;
var project_open = false;
var project_quick = false;
var menu_open = false;
var shop_open = false;
var home_pos = 0;
var shop_pos = 0;

var auto_open = false;

$(document).ready(function () {
  if ("ontouchstart" in document.documentElement) {
    touch = true;
    $("body").addClass("touch");
  }
  if (window.innerWidth < 800) {
    mobile = true;
  }

  initListeners();

  $(".marquee").marquee({
    duration: 20000,
    gap: 25,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true,
    startVisible: true,
  });
});

function initListeners() {
  $("body").click(function () {
    $(".logo")[0].play();
  });

  $(".tilt--prompt").click(function () {
    testDeviceOrientation();
  });

  $(window).focus(function () {
    $(".logo")[0].play();
  });

  $(window).on("resize", resizeHandler);

  if (!touch) {
    $(".nav--info").hover(
      function () {
        $("canvas").addClass("blur");
      },
      function () {
        $("canvas").removeClass("blur");
      }
    );
  } else {
    $(window).scroll(function () {});
  }

  $(window).scroll(function () {
    var s = $(window).scrollTop();
    if (!about_open && !project_open && !shop_open) {
      $(".scroll--wrapper").scrollLeft(s);
      if (s > window.innerWidth - 200) {
        window.history.pushState("", root + "/projects", root + "/projects");
        $(".nav--item[data-dest='projects']").addClass("selected");
        $("body").addClass("projects--open");
      } else {
        window.history.pushState("", root + "/", root + "/");
        $(".nav--item[data-dest='projects']").removeClass("selected");
        $("body").removeClass("projects--open");
      }
      $(".project--preview video").each(function (index) {
        var l = $(this).offset().left;
        if (l < window.innerWidth && l > -$(this).width()) {
          if ($(this)[0].paused) {
            $(this)[0].play();
          }
        } else {
          if (!$(this)[0].paused) {
            $(this)[0].pause();
          }
        }
      });
    } else if (project_open) {
      $(".project").scrollLeft(s);
      $(".project video").each(function (index) {
        var l = $(this).offset().left;
        if (l < window.innerWidth && l > -$(this).width()) {
          if ($(this)[0].paused) {
            $(this)[0].play();
          }
        } else {
          if (!$(this)[0].paused) {
            $(this)[0].pause();
          }
        }
      });
    } else if (shop_open) {
      $(".shop").scrollLeft(s);
    }
    if (s >= $("body")[0].scrollHeight - window.innerHeight && !mobile) {
      auto_open = true;
      openMenu();
    } else if (auto_open) {
      auto_open = false;
      closeMenu();
    }
  });

  $(".scroll--wrapper").scroll(function () {
    if (touch) {
      var s = $(this).scrollLeft();
      if (s > window.innerWidth - 100) {
        window.history.pushState("", root + "/projects", root + "/projects");
        $(".nav--item[data-dest='projects']").addClass("selected");
        $("body").addClass("projects--open");
      } else {
        window.history.pushState("", root + "/", root + "/");
        $(".nav--item[data-dest='projects']").removeClass("selected");
        $("body").removeClass("projects--open");
      }
      $(".project--preview video").each(function (index) {
        var l = $(this).offset().left;
        if (l < window.innerWidth && l > -$(this).width()) {
          if ($(this)[0].paused) {
            $(this)[0].play();
          }
        } else {
          if (!$(this)[0].paused) {
            $(this)[0].pause();
          }
        }
      });
      if (
        s >=
        $(".scroll--wrapper")[0].scrollWidth -
          window.innerHeight +
          $(".menu").width()
      ) {
        auto_open = true;
        openMenu();
      } else if (auto_open) {
        auto_open = false;
        closeMenu();
      }
    }
  });

  $(".project").scroll(function () {
    if (touch) {
      var s = $(this).scrollLeft();
      $(".project video").each(function (index) {
        var l = $(this).offset().left;
        if (l < window.innerWidth && l > -$(this).width()) {
          if ($(this)[0].paused) {
            $(this)[0].play();
          }
        } else {
          if (!$(this)[0].paused) {
            $(this)[0].pause();
          }
        }
      });
      if (
        s >=
        $(".project")[0].scrollWidth - window.innerHeight + $(".menu").width()
      ) {
        auto_open = true;
        openMenu();
      } else if (auto_open) {
        auto_open = false;
        closeMenu();
      }
    }
  });

  $(".menu--button").mousedown(function () {
    if ($("body").hasClass("menu--open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $(".nav--item").mousedown(function () {
    var dest = $(this).attr("data-dest");
    $(".nav--item").removeClass("selected");
    $(this).addClass("selected");
    navHandler(dest);
  });

  document.body.addEventListener(
    "load",
    function (event) {
      var elm = event.target;
      if (project_open) {
        scrollHeight($(".project--wrapper"));
      } else if (shop_open) {
        scrollHeight($(".shop--wrapper"));
      } else {
        scrollHeight($(".wrapper"));
      }
    },
    true // Capture event
  );
  document.body.addEventListener(
    "loadedmetadata",
    function (event) {
      var elm = event.target;
      if (project_open) {
        scrollHeight($(".project--wrapper"));
      } else if (shop_open) {
        scrollHeight($(".shop--wrapper"));
      } else {
        scrollHeight($(".wrapper"));
      }
    },
    true // Capture event
  );

  // PROJECTS
  $(".project--preview").click(function (e) {
    e.preventDefault();
    home_pos = $(".scroll--wrapper").scrollLeft();
    shop_pos = $(".shop").scrollLeft();
    var dest = $(this).attr("data-dest");
    projectHandler(dest);
  });
  $(".back--button").mousedown(function () {
    if ($("body").hasClass("shop--open")) {
      $(".nav--item[data-dest=shop]").addClass("selected");
      navHandler("shop");
    } else {
      navHandler("projects");
    }
  });

  window.addEventListener("deviceorientation", function (event) {
    if (touch) {
      tilt = true;
      tiltVal = event.gamma;
      if (tiltVal < -30) {
        tiltVal = -30;
      }
      if (tiltVal > 30) {
        tiltVal = 30;
      }
      tiltVal = tiltVal / 30 + 1;
    }
  });

  hashHandler();
  testDeviceOrientation();
}

function navHandler(dest) {
  if (dest == "projects") {
    if (!project_open && !about_open && !shop_open) {
      if (!touch && !mobile) {
        $("body, html").animate({ scrollTop: window.innerWidth - 25 }, 700);
      } else {
        $(".scroll--wrapper").animate(
          { scrollLeft: window.innerWidth - 15 },
          700
        );
      }
    } else {
      closeProject();
      scrollHeight($(".wrapper"));
      if (!touch && !mobile) {
        $("body, html").scrollTop(home_pos);
        $(".scroll--wrapper").scrollLeft(home_pos);
      } else {
        $("body, html").scrollTop(home_pos);
        $(".scroll--wrapper").scrollLeft(home_pos);
      }
    }
    if (!mobile) {
      setTimeout(function () {
        closeMenu();
      }, 500);
    } else {
      closeMenu();
    }
  }

  if (dest == "about") {
    openAbout();
    scrollHeight($(".about"));
  } else {
    closeAbout();
  }

  if (dest == "shop") {
    closeProject();
    scrollHeight($(".shop--wrapper"));
    $("body, html").scrollTop(shop_pos);
    $(".shop").scrollLeft(shop_pos);
    openShop();
  } else {
    closeShop();
  }

  var url = dest;
  current_page = url;
  window.history.pushState("", root + "/" + url, root + "/" + url);
}

function projectHandler(dest) {
  $(".project--wrapper").load(
    root + "/" + dest + ".json",
    function (response, status, xhr) {
      if (status != "error") {
        loadInstaEmbed();
        var url = dest;
        current_page = url;

        project_open = true;
        $("body").addClass("project--open");
        scrollHeight($(".project--wrapper"));
        projectListeners();
        $("body, html").scrollTop(0);
        $(".project").scrollLeft(0);
        $(".nav--item").removeClass("selected");
        closeMenu();
        window.history.pushState({}, root + "/" + url, root + "/" + url);
      } else {
        alert("error");
      }
    }
  );
}

function closeProject() {
  project_open = false;
  $("body").removeClass("project--open");
}

function projectListeners() {
  $(".project--desc a").each(function () {
    $(this).attr("target", "_blank");
  });
}

function openShop() {
  shop_open = true;
  $("body").removeClass("project--open");
  $("body").addClass("shop--open");
  if (mobile) {
    closeMenu();
  }
}
function closeShop() {
  shop_open = false;
  $("body").removeClass("shop--open");
}

function openAbout() {
  about_open = true;
  $("body").removeClass("project--open");
  $("body").addClass("about--open");
  if (mobile) {
    closeMenu();
  }
}
function closeAbout() {
  about_open = false;
  $("body").removeClass("about--open");
}

function openMenu() {
  $("body").addClass("menu--open");
  menu_open = true;
}
function closeMenu() {
  $("body").removeClass("menu--open");
  menu_open = false;
}

function scrollHeight(el) {
  var h =
    el.outerWidth() -
    window.innerWidth +
    window.innerHeight +
    $(".menu").innerWidth();
  $("body").css({ height: h + "px" });
  el.css({ "margin-right": $(".menu").innerWidth() - 25 + "px" });
  if (h + ($(".menu").innerWidth() - 25) <= window.innerWidth) {
    openMenu();
  }
}

function hashHandler() {
  var hash = location.hash;
  var path = location.pathname;

  if (path.includes("projects/")) {
    project_solo = true;
    $(".project--wrapper").append($(".project--solo").children());
    $(".project--solo").remove();
    $("body").addClass("project--open");
    project_open = true;
    scrollHeight($(".project--wrapper"));
    projectListeners();
    loadInstaEmbed();
  } else if (path.includes("shop/")) {
    project_solo = true;
    shop_open = true;
    $(".project--wrapper").append($(".project--solo").children());
    $(".project--solo").remove();
    $("body").addClass("project--open");
    project_open = true;
    scrollHeight($(".project--wrapper"));
    projectListeners();
    loadInstaEmbed();
  } else if (path == "/shop") {
    $(".nav--item[data-dest=shop]").addClass("selected");
    navHandler("shop");
  } else if (path == "/about") {
    $(".nav--item[data-dest=about]").addClass("selected");
    navHandler("about");
  } else {
    scrollHeight($(".wrapper"));
  }
}

function loadInstaEmbed() {
  // $(".insta--embed").each(function(){
  // 	var that = $(this);
  // 	var url = $(this).attr('data-url');
  // 	$.get('https://api.instagram.com/oembed/?url=' + url + '&omitscript=true', function( data ) {
  // 	  that.append(data.html);
  // 	  instgrm.Embeds.process();
  // 	});
  // });
  if (window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
}

function resizeHandler() {
  if (window.innerWidth < 800) {
    mobile = true;
  } else {
    mobile = false;
  }
  if (project_open) {
    scrollHeight($(".project--wrapper"));
  } else {
    scrollHeight($(".wrapper"));
  }
}

function testDeviceOrientation() {
  if (typeof DeviceOrientationEvent !== "function") {
    $("body").addClass("notilt");
    return setResult("No tilt");
  }
  if (typeof DeviceOrientationEvent.requestPermission !== "function") {
    $("body").addClass("notilt");
    return setResult("DeviceOrientationEvent.requestPermission not detected");
  } else {
    $(".menu").addClass("tilt--open");
  }
  DeviceOrientationEvent.requestPermission().then(function (result) {
    $(".menu").removeClass("tilt--open");
    if (result == "granted") {
      tilt = true;
      window.addEventListener("deviceorientation", function (event) {
        tiltVal = event.gamma;
        if (tiltVal < -30) {
          tiltVal = -30;
        }
        if (tiltVal > 30) {
          tiltVal = 30;
        }
        tiltVal = tiltVal / 30 + 1;
      });
    } else {
      $("body").addClass("notilt");
    }
    return setResult(result);
  });
}

function setResult(result) {
  console.log(result);
}

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
