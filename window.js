window.addEventListener('DOMContentLoaded', () => {
  set_appName();
  fetch_notifications();
  render_smallCards();
  render_bigCards();

  let extraContent = "";
  render_extraContent();

  if (window.location.href.indexOf('dashboard') > -1) {
    render_pageTitle('Dashboard');
  }
});


function render_pageTitle(title) {
  let page_title = document.getElementById('page_title');
  page_title.innerHTML = "Clutchy | " + title;
}

function set_appName() {
  let app_name = document.getElementById('app_name');
  app_name.innerHTML = "Clutchy";
}

function fetch_notifications() {
  let notifications = document.getElementById('notifications');

  test_notifications = [
    {
      title: "New Order",
      from: "John Doe",
      message: "You have a new order",
      time: "2 minutes ago",
      type: "Notification"
    },
    {
      title: "New Order",
      from: "John Doe",
      message: "You have a new order",
      time: "2 minutes ago",
      type: "Notification"
    },
    {
      title: "New Order",
      from: "John Doe",
      message: "You have a new order",
      time: "2 minutes ago",
      type: "Notification"
    },
  ];

  test_notifications.forEach(notification => {
    let notification_item = `<li class="mb-2">
      <a class="dropdown-item border-radius-md" href="javascript:;">
        <div class="d-flex py-1">
          <div class="my-auto">
            <!-- <img src="../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "> -->
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="text-sm font-weight-normal mb-1">
              <span class="font-weight-bold">${notification.title}</span> from ${notification.from}
            </h6>
            <p class="text-xs text-secondary mb-0 ">
              <i class="fa fa-clock me-1"></i>
              ${notification.time}
            </p>
          </div>
        </div>
      </a>
    </li>`;
    notifications.innerHTML += notification_item;
  });
}


function render_smallCards() {
  let cards = document.getElementById('small_cards');

  let test_cards = [
    {
      title: "Today's Money",
      value: "$53,000",
      percentage: "+55%",
      icon: "ni ni-money-coins text-lg opacity-10"
    },
    {
      title: "Today's Users",
      value: "2,300",
      percentage: "+3%",
      icon: "ni ni-world-2 text-lg opacity-10"
    },
    {
      title: "New Clients",
      value: "+3,462",
      percentage: "+60%",
      icon: "ni ni-paper-diploma text-lg opacity-10"
    },
    {
      title: "Sales",
      value: "535",
      percentage: "-57%",
      icon: "ni ni-cart text-lg opacity-10"
    },
  ];

  test_cards.forEach(card => {
    let card_template = `<div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
    <div class="card">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-8">
            <div class="numbers">
              <p class="text-sm mb-0 text-capitalize font-weight-bold">${card.title}</p>
              <h5 class="font-weight-bolder mb-0">
                ${card.value}
                <span class="text-success text-sm font-weight-bolder">${card.percentage}</span>
              </h5>
            </div>
          </div>
          <div class="col-4 text-end">
            <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
              <i class="${card.icon}" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    cards.innerHTML += card_template;
  });
};


function render_bigCards() {
  let cards = document.getElementById('big_cards');

  const test_cards = [
    {
      type: "type1",
      title: "Card title",
      subtitle: "Card subtitle",
      body: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      image_src: "../assets/img/illustrations/rocket-white.png",
      image_alt: "../assets/img/shapes/waves-white.svg",
      footer: "Card footer",
    },
    {
      type: "type2",
      title: "Card title",
      subtitle: "Card subtitle",
      body: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      image_src: "../assets/img/ivancik.jpg",
      image_alt: "../assets/img/shapes/waves-white.svg",
      footer: "Card footer",
    },
  ];

  test_cards.forEach(card => {

    let template_type1 = `<div class="col-lg-7 mb-lg-0 mb-4">
      <div class="card">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-lg-6">
              <div class="d-flex flex-column h-100">
                <p class="mb-1 pt-2 text-bold">${card.title}</p>
                <h5 class="font-weight-bolder">${card.subtitle}</h5>
                <p class="mb-5">${card.body}</p>
                <a class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                  ${card.footer}
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
              <div class="bg-gradient-primary border-radius-lg h-100">
                <img src="${card.image_alt}" class="position-absolute h-100 w-50 top-0 d-lg-block d-none" alt="waves">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">
                  <img class="w-100 position-relative z-index-2 pt-4" src="${card.image_src}" alt="rocket">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    let template_type2 = `
        <div class="col-lg-5">
          <div class="card h-100 p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('${card.image_src}');">
              <span class="mask bg-gradient-dark"></span>
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">${card.title}</h5>
                <p class="text-white">${card.body}</p>
                <a class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                  ${card.footer}
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>`;
    let card_template = card.type == "type1" ? template_type1 : template_type2;
    cards.innerHTML += card_template;
  });
}

function render_extraContent() {
  let extra_content = document.getElementById("extra_content");
  // logic here to fetch the extra content from db ?
  extra_content.innerHTML += '<p> Extra content here </p>';
  window.electronAPI.login("admin", "admin");
  window.electronAPI.on("login_response", (login_response) => {
    extra_content.innerHTML += `<p> ${login_response} </p>`;
  });
}