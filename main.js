var projects = [
  {
    title: 'About me',
    card_image: 'img/me.png',
    link: 'about'
  },
  {
    title: 'comake.io',
    card_image: 'img/comake.svg',
    link: 'comake'
  },
  {
    title: 'Wire Bender',
    card_image: 'img/wire-bender.gif',
    link: 'light-to-sound'
  },
  {
    title: 'Light 👉🏽 Sound',
    card_image: 'img/LtoS.png',
    link: 'light-to-sound'
  },
  {
    title: 'Paint',
    card_image: 'img/dot_burst.jpg',
    link: 'paint'
  },
  {
    title: 'Draw',
    card_image: 'img/eye.jpg',
    link: 'draw'
  },
  {
    title: 'Tesselation',
    card_image: 'img/tesselas.png',
    link: 'tesselation'
  },
  {
    title: 'Beacon App',
    card_image: 'img/beacon_creation.png',
    link: 'beacon-app'
  },
  {
    title: 'Architectural Association',
    card_image: 'img/to_trace.jpg',
    link: 'architectural-association'
  },
  {
    title: 'Deutsche Bank x DesignBoom',
    card_image: 'img/Smartphone_CloudTech.jpg',
    link: 'deutsche-designboom'
  },
];

loadProjects = function() {
  var template = $('.project-container.template');
  var list = $('#main-card .card-body');
  $.each(projects, function(i, project) {
    var card = template.clone().removeClass('template');
    var img = card.find('img');
    img.data('src', project['card_image']);
    card.find('p').html(project['title']);
    list.append(card);
    loadImageHelper(img.get(0));
    // card.show();
  });
}

loadImageHelper = function(image) {
  var $image = $(image);
  var downloadingImage = new Image();
  downloadingImage.onload = function() {
    image.src = this.src;
    projectContainer = $image.closest('.project-container');
    if (projectContainer.length) {
      projectContainer.show(400);
    }
  }
  downloadingImage.onerror = function() {
    return false;
  }
  downloadingImage.src = $image.data('src');
}

loadImages = function() {
  $("img").each(function(i, image) {
    var $image = $(image);
    if ($this.attr('src') == undefined && $this.is(":visible")) {
      loadImageHelper(image);
    }
  });
}

window.onload = function() {
  loadProjects()
};
