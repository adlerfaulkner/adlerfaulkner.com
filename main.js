var projects = [
  {
    title: 'About me',
    card_image: 'img/cards/me.png',
    link: 'about',
    description: "Creating useful, sophosticated, & playful objects. 1995 - Present"
  },
  {
    title: 'comake.io',
    card_image: 'img/cards/comake.png',
    link: 'comake',
    description: "The modern workflow browser. Fall 2016 - Present"
  },
  {
    title: 'MenuMe',
    card_image: 'img/cards/menume_background.png',
    link: 'menume',
    description: "Software Engineer and Product Designer. Summer 2015 - Spring 2016"
  },
  {
    title: 'Wire Bender',
    card_image: 'img/cards/wire-bender.gif',
    link: 'wire-bender',
    description: "Small scale 3d wire bending machine for rapid prototyping. Fall 2017"
  },
  {
    title: 'Light 👉🏽 Sound',
    card_image: 'img/cards/LtoS.png',
    link: 'light-to-sound',
    description: "An experiment in seeing with sound. Spring 2015"
  },
  {
    title: 'Paintings',
    card_image: 'img/cards/dot_burst.jpg',
    link: 'paintings',
    description: "Acryllic & mixed media paintings. 2010 - 2013"
  },
  {
    title: 'Drawings',
    card_image: 'img/cards/eye.jpg',
    link: 'drawings',
    description: "Graphite and charcoal drawings. 2009 - 2014"
  },
  {
    title: 'Tesselation',
    card_image: 'img/cards/tesselas.png',
    link: 'tesselation',
    description: "Visual Literacy and Design Studio project. Spring 2015"
  },
  {
    title: 'Eatery App',
    card_image: 'img/cards/beacon_creation.png',
    link: 'eatery-app',
    description: "Cornell App Development - Eatery iOS application. Fall 2014"
  },
  {
    title: 'Architectural Association',
    card_image: 'img/cards/to_trace.jpg',
    link: 'architectural-association',
    description: "Architectural Association School of Architecture. Summer 2014"
  },
  {
    title: 'Deutsche Bank x DesignBoom',
    card_image: 'img/cards/Smartphone_CloudTech.jpg',
    link: 'deutsche-designboom',
    description: "DeutscheBank DesignBoom International Competition. Summer 2014"
  },
];

var projectTemplate, projectList, url, idx, pageLink, cardTemplate, scaleValue, secondScaleValue,windowWidth, edgePadding, borderRadius, cardMargin;

setCardToSLargeState = function(cardPadding) {
  cardPadding.css({
    'left': 0,
    'top': 0,
    'padding':edgePadding,
    'height': window.innerHeight,
    'width': Math.min(windowWidth, 1300),
    'margin-left': cardMargin,
    'margin-right': cardMargin,
    'opacity': 1,
    'overflow': 'hidden'
  }).addClass('large');
  setTimeout(function() {
    cardPadding.css({
      'height': '',
      'overflow': ''
    });
  },400);
}

setCardToSmallState = function(cardPadding, position, height, width) {
  if (cardPadding.hasClass('large')) {
    cardPadding.css('height', window.innerHeight);
  }
  cardPadding.css({
    'padding':0,
    'left': position.left,
    'top': position.top,
    'height': height,
    'width': width,
    'margin-left': 0,
    'margin-right': 0,
    'opacity': 0.2,
    'overflow': 'hidden'
  }).addClass('small')
  .data({
    initialLeft: position.left,
    initialTop: position.top,
    initialWidth: width,
    initialHeight: height
  });
}
setCardToLargeBorderRadius = function(card, radius) {
  card.css({
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius,
    '-ms-border-radius': radius,
    'border-radius': radius,
    'margin-bottom': 45
  });
}
setCardToSmallBorderRadius = function(card, radius) {
  card.css({
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius,
    '-ms-border-radius': radius,
    'border-radius': radius,
    'margin-bottom': 0
  });
}
scaleAndBlurCard = function(card, scale, blur, addedClasses, removedClasses, left) {
  card.css({
    'left' : left,
    '-webkit-transform' : 'scale(' + scale + ')',
    '-moz-transform'    : 'scale(' + scale + ')',
    '-ms-transform'     : 'scale(' + scale + ')',
    '-o-transform'      : 'scale(' + scale + ')',
    'transform'         : 'scale(' + scale + ')',
    '-webkit-filter' : 'blur(' + blur + 'px)',
    'filter': 'blur(' + blur + 'px)'
  })
  .removeClass(removedClasses)
  .addClass(addedClasses);
}

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
  var cardPadding = newCard.find('.card-padding-wrapper');
  setCardToSmallState(cardPadding, initialPosition, $this.find('img').outerHeight(), $this.find('img').outerWidth());
  var card = cardPadding.find('.card');
  setCardToSmallBorderRadius(card, 7);
  var mainCardPaddingWidth = $('#main-card .card-padding-wrapper').width();
  setCardToSLargeState(cardPadding);
  setCardToLargeBorderRadius(card,borderRadius);
  setTimeout( function() {
    scaleAndBlurCard($('#main-card .card-padding-wrapper'), scaleValue, 2, "darken", "", -(mainCardPaddingWidth*0.07))
  }, 100);
}

closeCard = function(card) {
  var thisPageLink = card.data('link')
  // Update the browser url if the current pageLink is not this page's link
  history.pushState({isValid:true}, "", url);
  pageLink = null;

  var paddingWrapper = card.find('.card-padding-wrapper')
  setCardToSmallState(paddingWrapper, { left: paddingWrapper.data('initialLeft'), top: paddingWrapper.data('initialTop')}, paddingWrapper.data('initialHeight'), paddingWrapper.data('initialWidth'))
  setCardToSmallBorderRadius(card.find('.card'), 7)
  setTimeout( function() {
    card.remove();
  }, 300)
  setTimeout( function() {
    scaleAndBlurCard($('#main-card .card-padding-wrapper'), 1, 0, "", "darken", 0)
  }, 100);
}

closeImageCard = function(card) {
  var paddingWrapper = card.find('.card-padding-wrapper')
  setCardToSmallState(paddingWrapper, { left: paddingWrapper.data('initialLeft'), top: paddingWrapper.data('initialTop')}, paddingWrapper.data('initialHeight'), paddingWrapper.data('initialWidth'))
  setCardToSmallBorderRadius(card.find('.card'), 0)
  setTimeout( function() {
    card.remove();
  }, 300)
  var mainCardPaddingWidth = $('#main-card .card-padding-wrapper').width()
  setTimeout( function() {
    scaleAndBlurCard($('#main-card .card-padding-wrapper'), scaleValue, 2, "", "double-darken", -(mainCardPaddingWidth*0.07))
    scaleAndBlurCard($('.project-card:not(.template) .card-padding-wrapper'), 1, 0, "", "darken", 0)
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

edgePaddingFn = function() {
  if (windowWidth < 600) {
    return 20;
  } else if (windowWidth < 800) {
    return 30;
  } else {
    return 45;
  }
}

borderRadiusFn = function() {
  if (windowWidth < 600) {
    return 15;
  } else if (windowWidth < 800) {
    return 25;
  } else {
    return 35;
  }
}

window.onload = function() {
  projectTemplate = $('.project-container.template');
  projectList = $('#main-card .card-body');
  cardTemplate = $('.project-card.template');
  imageCardTemplate = $('.image-card.template');
  scaleValue = 0.96;
  secondScaleValue = 0.94;
  windowWidth = window.innerWidth;
  edgePadding = edgePaddingFn();
  borderRadius = borderRadiusFn();
  cardMargin = (windowWidth - Math.min(windowWidth, 1300))/2;
  loadProjectContainer(0);
};

window.onresize = function() {
  windowWidth = window.innerWidth;
  edgePadding = edgePaddingFn();
  borderRadius = borderRadiusFn();
  cardMargin = (windowWidth - Math.min(windowWidth, 1300))/2;
  if ($('.card-scroll-wrapper:not(#main-card):not(.template) .card-padding-wrapper').length) {
    $('.card-scroll-wrapper:not(.template) .card-padding-wrapper').css('padding', edgePadding);
    $('.card-scroll-wrapper:not(#main-card):not(.template) .card-padding-wrapper').css({
      'width': Math.min(windowWidth, 1300),
      'margin-left': cardMargin,
      'margin-right': cardMargin
    });
    $('.card-scroll-wrapper:not(.template) .card').css({
      '-webkit-border-radius': borderRadius,
      '-moz-border-radius': borderRadius,
      '-ms-border-radius': borderRadius,
      'border-radius': borderRadius
    });
    var mainCardPadding = $('#main-card .card-padding-wrapper')
    var mainCardPaddingWidth = mainCardPadding.width()
    if (mainCardPadding.hasClass("double-darken")) {
      $('#main-card .card-padding-wrapper').css('left',  -(mainCardPaddingWidth*0.12));
      $('.project-card .card-padding-wrapper').css('left',  -(mainCardPaddingWidth*0.07));
    } else {
      $('#main-card .card-padding-wrapper').css('left',  -(mainCardPaddingWidth*0.07));
    }
  }
}

$(document).on('click', '.card-scroll-wrapper .close-button, .card-scroll-wrapper:not(#main-card) .card-padding-wrapper', function(event) {
  if ($(event.target).is('.close-button, .close-button *, .card-padding-wrapper')) {
    var $this = $(this);
    var card = $this.closest('.card-scroll-wrapper');
    if (card.is('.image-card')) {
      closeImageCard(card);
    } else {
      closeCard(card);
    }
  }
});

$(document).on('click', '.clickable-image', function() {
  var $this = $(this)
  var initialPosition = $this.offset();
  var newCard = imageCardTemplate.clone()
    .removeClass('template');
  newCard.find('img.large-image').attr('src', $this.attr('data-large-image'))
  newCard.find('p').html($this.attr('data-caption'))
  $('body').append(newCard);
  var cardPadding = newCard.find('.card-padding-wrapper');
  setCardToSmallState(cardPadding, initialPosition, $this.outerHeight(), $this.outerWidth());
  var card = cardPadding.find('.card');
  setCardToSmallBorderRadius(card, 0);
  var projectCardPaddingWidth = $('.project-card:not(.template) .card-padding-wrapper').width();
  setCardToSLargeState(cardPadding);
  setCardToLargeBorderRadius(card,borderRadius);
  setTimeout( function() {
    scaleAndBlurCard($('#main-card .card-padding-wrapper'), secondScaleValue, 4, "double-darken", "", -(projectCardPaddingWidth*0.12))
    scaleAndBlurCard($('.project-card:not(.template) .card-padding-wrapper'), scaleValue, 2, "darken", "", -(projectCardPaddingWidth*0.07))
  }, 100);
});
