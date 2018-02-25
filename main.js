var projects = [
  {
    title: 'About me',
    card_image: 'img/me.png',
    link: 'about',
    description: "Creating useful, sophosticated, & playful objects. 1995 - Present"
  },
  {
    title: 'comake.io',
    card_image: 'img/comake.svg',
    link: 'comake',
    description: "The modern workflow browser. Fall 2016 - Present"
  },
  {
    title: 'MenuMe',
    card_image: 'img/menume_background.png',
    link: 'menume',
    description: ". Summer 2015 - Fall 2016"
  },
  {
    title: 'Wire Bender',
    card_image: 'img/wire-bender.gif',
    link: 'wire-bender',
    description: "Small scale 3d wire bending machine for rapid prototyping. Fall 2017"
  },
  {
    title: 'Light 👉🏽 Sound',
    card_image: 'img/LtoS.png',
    link: 'light-to-sound',
    description: "An experiment in seeing with sound. Spring 2015"
  },
  {
    title: 'Paint',
    card_image: 'img/dot_burst.jpg',
    link: 'paint',
    description: "Acryllic & mixed media paintings. 2010 - 2013"
  },
  {
    title: 'Draw',
    card_image: 'img/eye.jpg',
    link: 'draw',
    description: "Graphite and charcoal drawings. 2011 - 2015"
  },
  {
    title: 'Tesselation',
    card_image: 'img/tesselas.png',
    link: 'tesselation',
    description: "Visual Literacy and Design Studio project. Spring 2015"
  },
  {
    title: 'Eatery App',
    card_image: 'img/beacon_creation.png',
    link: 'eatery-app',
    description: "Cornell App Development - Eatery iOS application. Fall 2014"
  },
  {
    title: 'Architectural Association',
    card_image: 'img/to_trace.jpg',
    link: 'architectural-association',
    description: "Architectural Association School of Architecture. Summer 2014"
  },
  {
    title: 'Deutsche Bank x DesignBoom',
    card_image: 'img/Smartphone_CloudTech.jpg',
    link: 'deutsche-designboom',
    description: "DeutscheBank DesignBoom International Competition. Summer 2014"
  },
];

var projectTemplate, projectList, url, idx, pageLink, cardTemplate;

loadProject = function() {
  var $this = $(this);
  // Get the link for this card
  var thisPageLink = $this.data('link')
  // Update the browser url if the current pageLink is not this page's link
  if (thisPageLink == 'comake') {
    location.href = "https://comake.io";
    return
  }
  if (pageLink != thisPageLink) {
    history.pushState({isValid:true}, "", url + "#" + thisPageLink);
    pageLink = thisPageLink;
  }
  var initialPosition = $this.offset();
  var newCard = cardTemplate.clone()
    .removeClass('template')
    .data({
      link: thisPageLink
    });
  var projectData = projects.find(function(project) {
    return project.link == thisPageLink;
  })
  newCard.find('h1').html(projectData.title)
  newCard.find('h3').html(projectData.description)
  newCard.find('.card-body').load('pages/' + thisPageLink + '.html')

  $('body').append(newCard);
  var width = window.innerWidth;

  var cardPadding = newCard.find('.card-padding-wrapper')
    .css({
      'padding':0,
      'left': initialPosition.left,
      'top': initialPosition.top,
      'height': $this.find('img').outerHeight(),
      'width': $this.find('img').outerWidth(),
      'margin-left': 0,
      'margin-right': 0,
      'opacity': 0.2,
      'overflow': 'hidden'
    })
    .data({
      initialLeft: initialPosition.left,
      initialTop: initialPosition.top
    });
  var card = cardPadding.find('.card')
    .css({
      '-webkit-border-radius': '7px',
      '-moz-border-radius': '7px',
      '-ms-border-radius': '7px',
      'border-radius': '7px',
      'margin-bottom': 0
    });
  var mainCardPaddingWidth = $('#main-card .card-padding-wrapper').width()
  var margin = (width - Math.min(width, 1300))/2
  var edgePadding, borderRadius;
  if (width < 600) {
    edgePadding = 20;
    borderRadius = 15;
  } else if (width < 800) {
    edgePadding = 30;
    borderRadius = 25;
  } else {
    edgePadding = 45;
    borderRadius = 35;
  }
  cardPadding.css({
    'left': 0,
    'top': 0,
    'padding':edgePadding,
    'height': window.innerHeight,
    'width': Math.min(width, 1300),
    'margin-left': margin,
    'margin-right': margin,
    'opacity': 1,
    'overflow': 'visible'
  });
  var scaleValue = 0.95;
  card.css({
    '-webkit-border-radius': borderRadius,
    '-moz-border-radius': borderRadius,
    '-ms-border-radius': borderRadius,
    'border-radius': borderRadius,
    'margin-bottom': 45
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

closeCard = function(card) {
  var thisPageLink = card.data('link')
  // Update the browser url if the current pageLink is not this page's link
  history.pushState({isValid:true}, "", url);
  pageLink = null;

  var projectContainer = $(".project-container[link='" + thisPageLink + "']");
  var finalPosition = projectContainer.offset();
  var paddingWrapper = card.find('.card-padding-wrapper')
  paddingWrapper
    .css({
      'padding':0,
      'left': paddingWrapper.data('initialLeft'),
      'top': paddingWrapper.data('initialTop'),
      'height': projectContainer.find('img').outerHeight(),
      'width': projectContainer.find('img').outerWidth(),
      'margin-left': 0,
      'margin-right': 0,
      'opacity': 0.2,
      'overflow': 'hidden'
    });
  card.find('.card')
    .css({
      '-webkit-border-radius': '7px',
      '-moz-border-radius': '7px',
      '-ms-border-radius': '7px',
      'border-radius': '7px',
      'margin-bottom': 0
    });
  setTimeout( function() {
    card.remove();
  }, 300)
  setTimeout( function() {
    $('#main-card .card-padding-wrapper').css({
      'left' : 0,
      '-webkit-transform' : 'scale(1)',
      '-moz-transform'    : 'scale(1)',
      '-ms-transform'     : 'scale(1)',
      '-o-transform'      : 'scale(1)',
      'transform'         : 'scale(1)',
      '-webkit-filter' : 'blur(0px)',
      'filter': 'blur(0px)'
    }).removeClass('darken')
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

window.onresize = function() {
  if ($('.card-scroll-wrapper:not(#main-card):not(.template) .card-padding-wrapper').length) {
    var width = window.innerWidth;
    var margin = (width - Math.min(width, 1300))/2;
    var edgePadding, borderRadius;
    if (width < 600) {
      edgePadding = 20;
      borderRadius = 15;
    } else if (width < 800) {
      edgePadding = 30;
      borderRadius = 25;
    } else {
      edgePadding = 45;
      borderRadius = 35;
    }
    $('.card-scroll-wrapper:not(.template) .card-padding-wrapper').css('padding', edgePadding);
    $('.card-scroll-wrapper:not(#main-card):not(.template) .card-padding-wrapper').css({
      'height': window.innerHeight,
      'width': Math.min(width, 1300),
      'margin-left': margin,
      'margin-right': margin
    });
    $('.card-scroll-wrapper:not(.template) .card').css({
      '-webkit-border-radius': borderRadius,
      '-moz-border-radius': borderRadius,
      '-ms-border-radius': borderRadius,
      'border-radius': borderRadius
    });
    var mainCardPaddingWidth = $('#main-card .card-padding-wrapper').width()
    $('#main-card .card-padding-wrapper').css('left',  -(mainCardPaddingWidth*0.08));
  }
}

$(document).on('click', '.card-scroll-wrapper .close-button, .card-scroll-wrapper:not(#main-card) .card-padding-wrapper', function(event) {
  if ($(event.target).is('.close-button, .close-button *, .card-padding-wrapper')) {
    var $this = $(this);
    var card = $this.closest('.card-scroll-wrapper');
    closeCard(card);
  }
});
