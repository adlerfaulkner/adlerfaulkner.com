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

var cardTemplate, projectList;

loadProject = function(i) {
  if (projects.length >= i+1) {
    project = projects[i];
    var card = cardTemplate.clone().removeClass('template');
    var img = card.find('img');
    img.data('src', project['card_image']);
    card.find('p').html(project['title']);
    projectList.append(card);
    loadImageHelper(img.get(0));
  }
}

loadImageHelper = function(image) {
  var $image = $(image);
  var downloadingImage = new Image();
  downloadingImage.onload = function() {
    image.src = this.src;
    projectContainer = $image.closest('.project-container');
    if (projectContainer.length > 0) {
      projectContainer.css('opacity', 1)
      loadProject(projectContainer.index() + 1);
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
  cardTemplate = $('.project-container.template');
  projectList = $('#main-card .card-body');
  loadProject(0)
};
