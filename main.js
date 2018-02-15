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
    link: 'wire-bender'
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

var projectTemplate, projectList, url, idx, pageLink, cardTemplate;

loadProject = function() {
  var $this = $(this);
  // Get the link for this card
  var thisPageLink = $this.data('link')
  // Update the browser url if the current pageLink is not this page's link
  if (pageLink != thisPageLink) {
    history.pushState({isValid:true}, "", url + "#" + thisPageLink);
    pageLink = thisPageLink;
  }
  initialPosition = $this.offset()
  var newCard = cardTemplate.clone()
    .removeClass('template');
  $('body').append(newCard)

  var cardPadding = newCard.find('.card-padding-wrapper')
    .css({
      'padding':0,
      'left': initialPosition.left,
      'top': initialPosition.top,
      'height': $this.find('img').outerHeight(),
      'width': $this.find('img').outerWidth(),
      'margin-left': 0,
      'margin-right': 0,
      'opacity': 0.2
    });
  var card = cardPadding.find('.card')
    .css({
      '-webkit-border-radius': '7px',
      '-moz-border-radius': '7px',
      '-ms-border-radius': '7px',
      'border-radius': '7px'
    });
  var mainCardPaddingWidth = $('#main-card .card-padding-wrapper').width()
  var margin = (window.innerWidth - Math.min(window.innerWidth, 1300))/2
  cardPadding.css({
    'left': 0,
    'top': 0,
    'padding':45,
    'height': window.innerHeight,
    'width': Math.min(window.innerWidth, 1300),
    'margin-left': margin,
    'margin-right': margin,
    'opacity': 1
  });
  var scaleValue = 0.95;
  card.css({
    '-webkit-border-radius': '35px',
    '-moz-border-radius': '35px',
    '-ms-border-radius': '35px',
    'border-radius': '35px'
  });
  setTimeout( function() {
    $('#main-card .card-padding-wrapper').css({
      'left' : -(mainCardPaddingWidth*0.08),
      '-webkit-transform' : 'scale(' + scaleValue + ')',
      '-moz-transform'    : 'scale(' + scaleValue + ')',
      '-ms-transform'     : 'scale(' + scaleValue + ')',
      '-o-transform'      : 'scale(' + scaleValue + ')',
      'transform'         : 'scale(' + scaleValue + ')',
      '-webkit-filter' : 'blur(4px)',
      'filter': 'blur(4px)'
    }).addClass('darken')
  }, 100);
}

loadProjectContainer = function(i) {
  if (projects.length >= i+1) {
    var project = projects[i];
    var card = projectTemplate.clone()
      .removeClass('template')
      .data(project)
      .attr(project)
    var img = card.find('img');
    img.data('src', project['card_image']);
    card.find('p').html(project['title']);
    projectList.append(card);
    loadImageHelper(img.get(0));
  } else {
    loadCardFromUrl()
  }
}

loadImageHelper = function(image) {
  var $image = $(image);
  var downloadingImage = new Image();
  downloadingImage.onload = function() {
    image.src = this.src;
    var projectContainer = $image.closest('.project-container');
    if (projectContainer.length > 0) {
      projectContainer.css('opacity', 1);
      index = projectContainer.index()
      loadProjectContainer(index + 1);
      projectContainer.click(loadProject);
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

loadCardFromUrl = function() {
  url = window.location.href;
  idx = url.indexOf("#");
  if (idx != -1) {
    pageLink = url.substring(idx+1);
    url = url.substring(0, idx);
    loadProject.call($(".project-container[link='" + pageLink + "']"))
  }
}

window.onload = function() {
  projectTemplate = $('.project-container.template');
  projectList = $('#main-card .card-body');
  cardTemplate = $('.card-scroll-wrapper.template');
  loadProjectContainer(0);
};
