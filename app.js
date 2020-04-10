/**
 * (c) 2020 Mathias Picker | MIT License
 * Personal website for Mathias Picker - by Mathias Picker.
 *
 * All code is written independently and fairly represents my JavaScipt coding skills and
 * how i like to experiment/create things when programming front-end stuff.
 *
 * Usually i like to split up my code into different modules, but i've kept
 * everything in one place so that people who are interested in examining my code
 * can do so.
 */

'use strict';

// Selecting the only element in DOM - this is where it all begins.
const main = document.querySelector('main');

let cookie = false;
let language = 'en';
const detectedLanguange = window.navigator.language.slice(0, 2);

// If user is norwegian, use norwegian text
if (detectedLanguange == 'nb') {
  language = detectedLanguange;
}

// English and norwegian version of all text on webpage :)
const text = {
  helloThere: {
    nb: 'Hei der!',
    en: 'Hello there!'
  },
  welcomeBack: {
    nb: 'Velkommen tilbake!',
    en: 'Welcome back!'
  },
  nightModeIsOne: {
    nb: 'Nattmodus er slått på',
    en: 'Dark mode activated'
  },
  myNameIsMathias: {
    nb: 'Jeg heter Mathias Picker',
    en: 'My name is Mathias Picker'
  },
  andIAmAnFrontEnd: {
    nb: 'og jeg er en junior front-end utvikler',
    en: 'and i am a junior front-end developer'
  },
  myFocusIs: {
    nb: 'Mitt hovedfokus er',
    en: 'My passion is'
  },
  modernAnd: {
    nb: 'moderne og ',
    en: 'modern and '
  },
  humancenteredDesign: {
    nb: 'brukersentrert design',
    en: 'human-centered design'
  },
  toAchieveThis: {
    nb: 'For å oppnå dette benytter jeg meg av',
    en: 'To achieve this, I use...'
  },
  catTerminal: {
    nb: 'cat ~/tingjegbruker.txt | vis',
    en: 'cat ~/thingsiuse.txt | read'
  },
  homepage: {
    nb: 'hjemmeside',
    en: 'homepage'
  },
  resume: {
    nb: '"CV"',
    en: '"resume"'
  },
  showIntroAgain: {
    nb: 'Vis intro igjen',
    en: 'Show intro again'
  },
  sinceYouAreOnMobile: {
    nb:
      'Siden du er på telefon behøver du kun å swipe til høyre eller venstre for å navigere mellom sidene.',
    en:
      'Since you are on a mobile device, you only need to swipe right or left to navigate between the pages.'
  },
  clickHereToCloseOverlay: {
    nb: 'Trykk her for å lukke overlay',
    en: 'Click here to close overlay'
  },
  clickToReadMore: {
    nb: 'Trykk her for å lese mer',
    en: 'Click to read more'
  },
  clickToGoTo: {
    nb: 'Trykk her for å se profilen min',
    en: 'Click here to see my profile'
  },
  clickForContactDetails: {
    nb: 'Trykk her for kontaktdetaljer',
    en: 'Click for contact details'
  },
  observation: {
    nb: 'Observering',
    en: 'Observation'
  },
  experimentation: {
    nb: 'Eksperimentering',
    en: 'Experimentation'
  }
};

/**
 * Function for creating the intro-animations
 * @param {Boolean} again - Used if the user wants to see the animation again
 */

function showIntro(again) {
  if (again) {
    // "Clearing up" main before creating intro
    [...main.children].forEach(child => {
      main.removeChild(child);
    });
  }
  const content = document.createElement('div');
  content.classList.add('content');
  main.appendChild(content);

  const elementOne = document.createElement('div');
  content.appendChild(elementOne);

  const elementTwo = document.createElement('div');
  content.appendChild(elementTwo);

  // Reset is used to tell when a round is over and animation must start over
  let reset = false;

  // We start on round 1
  let round = 1;

  // Amount of animations per round
  let animationAmount = 2;

  // For counting the amount of animations for every round
  let animationCounter = 0;

  // Init for greeting-intro
  main.classList.add('cinema-mode');

  elementOne.classList.add('hello');
  elementOne.textContent = text.helloThere[language];

  elementTwo.classList.add('wave');
  elementTwo.textContent = '👋';

  // Check if user has been here before, and if so: skip intro
  if (
    document.cookie
      .split(';')
      .some(item => item.trim().startsWith('sessionId=')) &&
    !again
  ) {
    round = 4;
    elementOne.textContent = text.welcomeBack[language];
    cookie = true;
  }

  // Handle page visibility change events - fixing pausing in intro-animations
  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      [...content.childNodes].forEach(el => {
        el.classList.add('paused');
      });
    } else {
      [...content.childNodes].forEach(el => {
        el.classList.remove('paused');
      });
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange, false);

  // Finding browser name
  const nettleser = (function(agent) {
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'Edge';
      case agent.indexOf('edg') > -1:
        return 'Edge (dev)';
      case agent.indexOf('opr') > -1 && !!window.opr:
        return 'Opera';
      case agent.indexOf('chrome') > -1 && !!window.chrome:
        return 'Google Chrome';
      case agent.indexOf('trident') > -1:
        return 'Internet Explorer';
      case agent.indexOf('firefox') > -1:
        return 'Firefox';
      case agent.indexOf('safari') > -1:
        return 'Safari';
      default:
        return 'nettleser';
    }
  })(window.navigator.userAgent.toLowerCase());

  /**
   ** Dark mode if it's late
   **/
  const dateHours = new Date().getHours();

  if ((dateHours < 6 || dateHours > 20) && !again) {
    // "Invert" colors
    document.documentElement.style.setProperty('--white', '24, 24, 24');
    document.documentElement.style.setProperty('--dark-grey', '255,255,255');

    // Create notification
    const afterDark = document.createElement('div');

    afterDark.textContent = text.nightModeIsOne[language];
    afterDark.classList.add('notification');

    // Inserting notification on top of html
    document.body.insertAdjacentElement('afterbegin', afterDark);

    // Remove from DOM when finished
    afterDark.addEventListener('animationend', function() {
      this.parentElement.removeChild(this);
    });
  }

  // For resetting an element
  function resetElement(element) {
    // "Clear" (more like reset) onanimationend events.
    element.onanimationend = () => {};

    // Remove all classnames and
    [...element.classList].forEach(className => {
      element.classList.remove(className);
    });

    // Reset content
    element.innerHTML = '';
  }

  // Looping through the different intro-sections with this one eventListener on parent
  content.addEventListener(
    'animationend',
    function() {
      // If not on reset (last animation done) then count up!
      if (!reset) {
        animationCounter++;
      }
      // If on reset; preparing for next round
      else {
        // Resetting stuff that are added/altered in switch statements
        [...this.classList].forEach(className => {
          if (className !== 'content') this.classList.remove(className);
        });

        // Resetting animation-amount to standard
        animationAmount = 2;

        // Resetting both elements
        resetElement(elementOne);
        resetElement(elementTwo);

        // The place where i decide what the content should be for the different rounds
        switch (round) {
          case 2:
            this.classList.add('column');

            elementOne.classList.add('i-am');
            elementOne.textContent = text.myNameIsMathias[language];

            elementTwo.classList.add('i-like');
            elementTwo.classList.add('blinky');

            elementTwo.textContent = '> ';

            elementOne.onanimationend = () => {
              // Turn text into arrray and reverse so it gets input correct way
              const sentence = text.andIAmAnFrontEnd[language]
                .split('')
                .reverse();

              // Typing animation
              const interval = setInterval(() => {
                sentence.length === 0
                  ? clearInterval(interval)
                  : (elementTwo.textContent += sentence.pop());
              }, 100);
            };

            // Animation amount has to be 3 this round because of pseudo-element with animation
            animationAmount = 3;
            break;

          case 3:
            this.classList.add('column');

            elementOne.classList.add('front-end-1');

            // Splitting up sentence so that each word can get seperate animation
            const sentence = text.myFocusIs[language].split(' ');

            // Creating the elements for the sentence, giving each word an animation with a delay
            for (let i = 0; i < sentence.length; i++) {
              const wordElement = document.createElement('span');

              wordElement.textContent = sentence[i];

              wordElement.classList.add(`reveal-${i + 1}`);
              wordElement.classList.add('start');

              elementOne.appendChild(wordElement);

              // Remove class after animation so that opacity doesn't stay at 0
              wordElement.addEventListener('animationend', function() {
                this.classList.remove('start');
              });
            }

            elementTwo.classList.add('front-end-2');
            elementTwo.classList.add('invisible');

            elementTwo.textContent = text.modernAnd[language];

            // Creating own element for the click-animation
            const spanElement = document.createElement('span');
            spanElement.textContent = text.humancenteredDesign[language];

            elementTwo.appendChild(spanElement);

            // Timer for when the cursor will "click" on element
            setTimeout(() => {
              spanElement.classList.add('focused');
            }, 5610);

            elementTwo.onanimationend = function() {
              this.classList.remove('invisible');
            };

            // Animation amount has to increase for every word in sentence because they have an animation each
            animationAmount = 2 + sentence.length;
            break;

          case 4:
            this.classList.add('column');

            elementOne.classList.add('achieve');
            elementOne.textContent = text.toAchieveThis[language];

            // List of coding-stuff
            const words = [
              'HTML',
              'SRCSET',
              'SVG',
              'CSS',
              'Flex',
              'Grid',
              'Keyframes',
              'Variables',
              'SCSS',
              'Media queries',
              'JavaScript',
              '(ES6+)',
              'Async/await',
              'REST',
              'JSON',
              'React',
              'NodeJS',
              'Express',
              'Handlebars',
              'Babel',
              'Webpack',
              'Github',
              text.observation[language],
              text.experimentation[language]
            ];

            elementTwo.classList.add('i-code');
            elementTwo.classList.add('blinky');

            elementTwo.textContent = '> ';

            // Some interval and timeouts for the terminal-animation
            elementOne.onanimationend = () => {
              setTimeout(() => {
                let sentence = text.catTerminal[language];

                // Typing animation
                function typeSentence(first) {
                  // Turn text into arrray and reverse so it gets input correct way
                  sentence = sentence.split('').reverse();

                  // Start typing
                  const type = setInterval(() => {
                    if (first) {
                      if (sentence.length === 0) {
                        clearInterval(type);

                        elementTwo.classList.add('static');
                        elementTwo.classList.remove('blinky');
                        addWords();

                        return;
                      }
                      elementTwo.textContent += sentence.pop();
                    } else {
                      if (sentence.length === 0) {
                        clearInterval(type);

                        return;
                      }
                      elementTwo.innerHTML += sentence.pop();
                    }
                  }, 100);
                }

                function addWords() {
                  let j = 0;

                  const addWords = setInterval(() => {
                    if (j === words.length) {
                      elementTwo.innerHTML += '> ';
                      clearInterval(addWords);
                      elementTwo.classList.add('blinky-2');
                      elementTwo.scroll(0, elementTwo.scrollHeight);

                      setTimeout(() => {
                        sentence = `open -a "${nettleser}" ${text.homepage[language]}.html`;
                        typeSentence(false);
                      }, 1200);

                      return;
                    }

                    const newLine = document.createElement('p');
                    newLine.textContent = `> ${words[j]}`;

                    elementTwo.appendChild(newLine);

                    elementTwo.scroll(0, elementTwo.scrollHeight);

                    j++;
                  }, 200);
                }

                typeSentence(true);
              }, 500);
            };

            animationAmount = 3;

            break;

          default:
            break;
        }

        // Reset
        reset = false;
      }

      // Check if all elements are done with their animations in a round
      // If true, then prepare for the next round
      if (animationCounter === animationAmount) {
        reset = true;
        animationCounter = 0;

        switch (round) {
          case 1:
            this.classList.add('away-1');

            break;
          case 2:
            this.classList.add('away-2');
            break;

          case 3:
            this.classList.add('away-3');
            break;

          case 4:
            cookie
              ? this.classList.add('away-1')
              : this.classList.add('away-4');

            this.onanimationend = function() {
              main.removeChild(this);

              createPage();

              // Removing eventlistener for when user goes out of tab - no longer necessary
              document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
                false
              );
            };
            break;
          default:
            break;
        }

        round++;
      }
    },
    false
  );
}

// Automatically show intro when entering page
showIntro();

// Creating the page when intro is done.
// Sure i could easily make everything in HTML, but this is (more) fun/challenging. And it's my website, i can do what i want.
async function createPage() {
  main.classList.remove('cinema-mode');

  const fullPage = document.createElement('div');

  fullPage.classList.add('full-page');

  main.appendChild(fullPage);

  // Setting height to content part based on window height. Making it better for mobile devices
  document.documentElement.style.setProperty(
    '--content-height',
    `${window.innerHeight}px`
  );

  /**
   * NAVIGATION PART
   */

  const navigationPart = document.createElement('div');
  navigationPart.classList.add('navigation-part');

  const navigationTitle = document.createElement('h2');
  navigationTitle.textContent = `Mathias Picker ${text.resume[language]}`;
  navigationTitle.classList.add('navigation-title');

  const showIntroAgainBtn = document.createElement('button');
  showIntroAgainBtn.textContent = text.showIntroAgain[language];
  showIntroAgainBtn.classList.add('show-intro-again');
  showIntroAgainBtn.addEventListener('click', () => {
    showIntro(true);
  });

  const navigation = document.createElement('nav');
  navigation.classList.add('navigation');

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');

  // Kinda the "database" with the different items to scroll through
  // NOTE: All items will get a dynamic "index" added below
  const response = await fetch(`${document.URL}/posts-${language}.json`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  });

  const navigationItems = await response.json();

  // List with every category x1
  const categories = [];
  // For counting how many items in each category
  const categoriesInfo = {};

  navigationItems.forEach(item => {
    // Used for interaction with navigation and showcase-items
    const categoryAsId = item.category.split(' ').join('-');

    if (!categories.includes(item.category)) {
      // Adding category to an array with only one of every category
      categories.push(item.category);

      // Keeping track of the occurence of every category
      categoriesInfo[categoryAsId] = 1;
    } else {
      // Increasing the count of the category
      categoriesInfo[categoryAsId]++;
    }

    // Adding index of item (counts from within category)
    item['index'] = categoriesInfo[categoryAsId];
  });

  // Creating navigation item for each category
  categories.forEach(category => {
    const navigationItem = document.createElement('button');
    navigationItem.classList.add('navigation-item');
    navigationItem.textContent = category;
    // Don't want id's with spaces in them
    navigationItem.id = category.split(' ').join('-');
    navigationWrapper.appendChild(navigationItem);
  });

  // Setting height based on how many elements in list
  document.documentElement.style.setProperty(
    '--nav-min',
    `${categories.length * 15}rem`
  );

  // Short 'hack' for finding out if platform is a mobile device
  const isMobile = () => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  };

  if (!cookie) {
    if (window.matchMedia('(max-width: 63.74em)').matches && isMobile()) {
      const infoAlert = document.createElement('div');
      infoAlert.textContent = text.sinceYouAreOnMobile[language];
      infoAlert.classList.add('info-popup');
      fullPage.appendChild(infoAlert);

      infoAlert.addEventListener('animationend', function() {
        fullPage.removeChild(this);
      });
    }
    // Session cookie so that you don't need to see the whole intro again
    document.cookie = 'sessionId=beenherebefore';
  }

  // Adding DOM elements in correct order
  navigation.appendChild(navigationWrapper);
  navigationPart.appendChild(navigationTitle);
  navigationPart.appendChild(showIntroAgainBtn);
  navigationPart.appendChild(navigation);
  fullPage.appendChild(navigationPart);

  /**
   * CONTENT PART
   */

  // This variable is mostly used in the scrolling eventlistener to set what element is currently showing on screen.
  // Decided to also use this variable in the function for showing the full text of an item (deciding what text to show)
  let currentlyShowing = navigationItems[0];

  const contentPart = document.createElement('div');
  contentPart.classList.add('content-part');

  const navigationShowcase = document.createElement('section');
  navigationShowcase.classList.add('navigation-showcase');
  navigationShowcase.classList.add('snappy');

  const contentTextPart = document.createElement('div');
  contentTextPart.classList.add('content-text-part');

  const closeContentTextPart = document.createElement('div');
  closeContentTextPart.classList.add('close-content-text');

  const closeContentTextPartContent = document.createElement('div');
  closeContentTextPartContent.classList.add('close-content-text-content');
  closeContentTextPartContent.textContent =
    text.clickHereToCloseOverlay[language];

  closeContentTextPart.appendChild(closeContentTextPartContent);

  const contentTextWrapper = document.createElement('div');
  contentTextWrapper.classList.add('content-text-wrapper');

  const contentTextFull = document.createElement('div');
  contentTextFull.classList.add('content-text-full');

  contentTextWrapper.appendChild(contentTextFull);

  contentTextPart.appendChild(closeContentTextPart);
  contentTextPart.appendChild(contentTextWrapper);

  function sendIn() {
    // Adding the text to the element clicked on (aka the active/currently showing element)
    const clickedItem = navigationItems.find(
      item => item.id === currentlyShowing.id
    );

    if (clickedItem.id === 'github') {
      window.open('https://github.com/MathiasWP');
      return;
    }

    // Using innerHTML for the contact slide instead because of tags
    clickedItem.id === 'contact'
      ? (contentTextFull.innerHTML = clickedItem.text)
      : (contentTextFull.textContent = clickedItem.text);

    // Adding the animations for showing the content-text-parts
    contentTextPart.classList.add('show-text');
    contentTextPart.classList.add('in');

    // Scroll to top of wrapper
    contentTextWrapper.scroll(0, 0);

    navigationPart.classList.add('invisible');
    contentPart.classList.add('invisible');
  }

  function closeText() {
    // Removing a lot of classes and adding one. I think it's better to just remove 'em all in case something weird happens
    contentTextPart.classList.add('out');
    contentTextPart.classList.remove('in');
    contentPart.classList.remove('invisible');
    navigationPart.classList.remove('invisible');
  }

  navigationItems.forEach(item => {
    // Item wrapper
    const itemDIV = document.createElement('div');
    itemDIV.classList.add('item-div');
    itemDIV.classList.add(item.category.split(' ').join('-'));
    itemDIV.id = item.id;

    // Adding click-event for item
    itemDIV.addEventListener('click', sendIn, false);

    // Eventlistener used for animation when going ot of content-text-part
    contentTextPart.addEventListener(
      'animationend',
      function() {
        if (this.classList.contains('out')) {
          this.classList.remove('show-text');
          this.classList.remove('out');
        }
      },
      false
    );

    // Title for every item
    const contentTitle = document.createElement('h2');
    contentTitle.textContent = item.name;
    contentTitle.classList.add('content-title');
    itemDIV.appendChild(contentTitle);

    // Text for every item
    const contentText = document.createElement('p');

    if (item.id === 'contact') {
      contentText.textContent = text.clickForContactDetails[language];
    } else if (item.id === 'github') {
      contentText.textContent = text.clickToGoTo[language];
    } else {
      contentText.textContent = text.clickToReadMore[language];
    }

    contentText.classList.add('content-text');
    itemDIV.appendChild(contentText);

    // Add item to navigation-showcaser
    navigationShowcase.appendChild(itemDIV);
  });

  closeContentTextPartContent.addEventListener('click', closeText, false);

  contentPart.appendChild(navigationShowcase);
  fullPage.appendChild(contentPart);
  fullPage.appendChild(contentTextPart);

  /**
   * HERE I DO THINGS BASED ON DOM, SO IT HAS TO BE DONE AFTER EVERYTHING HAS BEEN ADDED TO DOCUMENT
   */

  // Storing some useful things about each element
  let itemIdAndPosition = [...navigationShowcase.children]
    .map(child => [
      {
        element: child,
        id: child.id,
        category: child.classList[1],
        position: child.offsetLeft,
        index: navigationItems.filter(c => c.id === child.id)[0].index
      }
    ])
    .flat();

  // Setting first element to active
  // MAYBE CHANGE THIS IF I WANT TO HAVE POPSTATE AND HISTORY FOR DIFFERENT ITEMS
  itemIdAndPosition[0].element.classList.add('active');

  [...navigationWrapper.children]
    .filter(tag => itemIdAndPosition[0].element.classList.contains(tag.id))[0]
    .classList.add('navigation-active');

  /**
   * FUNCTION FOR HANDLING IN AND OUT SCROLL ANIMATIONS
   *
   * @param {HTMLElement / Object} thisElement - Depends if the call is done recursively or not
   * @param {Oject / Boolean} nextElement - Depends if the call is done recursively or not
   * @param {String} className - Class to be added
   */
  function scrollAnimation(thisElement, nextElement, className) {
    let eventElement;

    // Because everything in JS is an object, it doesn't really work to just do typeof :3
    // Therefore i just check if thisElement has a property that the object passed from the navigationWrapper click-event would have
    thisElement.hasOwnProperty('element')
      ? (eventElement = thisElement.element)
      : (eventElement = thisElement);

    eventElement.classList.add('will-change');

    // Make all other items invisible
    itemIdAndPosition
      .filter(item => item.element.id !== eventElement.id)
      .forEach(item => item.element.classList.add('invisible'));

    if (nextElement) {
      eventElement.classList.add('will-change');
      // Have to remove class 'invisible' on the incoming element immediately again for fixing a bug with safari.
      document.getElementById(nextElement.id).classList.remove('invisible');
    }

    // Adding the scroll-animation to element
    eventElement.classList.add(className);

    // Function used for the animation events of this and next element.
    function eventFunction() {
      eventElement.classList.remove(className);
      eventElement.classList.remove('will-change');

      [...document.querySelectorAll('.invisible')].forEach(element =>
        element.classList.remove('invisible')
      );

      if (nextElement) {
        // Have to do this even though there's an eventListener for scroll, because users can scroll past multiple elements with the scroll and then it's not 100% sure that eventListener removes classList for us
        thisElement.classList.remove('active');
        thisElement.classList.remove('will-change');

        let nextClassName;
        // Making the animations come and go right
        switch (className) {
          case 'out-left':
            nextClassName = 'in-right';
            break;
          case 'out-right':
            nextClassName = 'in-left';
            break;
        }

        // Adding scroll-animation to next element, passing no next-element and the correct classname
        scrollAnimation(nextElement, false, nextClassName);

        // Scrolling to next element
        navigationShowcase.scroll(nextElement.position, 0);
      }
      // Remove this evenListener function when the eventListener is finished, so that it doesn't mess things ups
      eventElement.removeEventListener('animationend', eventFunction, false);

      if (!nextElement) {
        navigationDisabled(false);
      }
    }

    // When this element is done with its animation run eventFunction (which handles what to do after animation)
    eventElement.addEventListener('animationend', eventFunction, false);
  }

  // Function for disabling navigation buttons
  function navigationDisabled(boolean) {
    [...navigationWrapper.children].forEach(tag => {
      tag.disabled = boolean;

      // Adding a little color change so user understands that clicking doesnt help
      boolean
        ? tag.classList.add('disabled')
        : tag.classList.remove('disabled');
    });

    if (boolean === true) {
      // Make scroll-thumb invisible
      document.documentElement.style.setProperty('--scroll-thumb', 0);
      // Remove scroll-snap-type on showcase-wrapper
      navigationShowcase.classList.remove('snappy');
      // Disabling clicking on items to show their text
      [...navigationShowcase.children].forEach(item => {
        item.removeEventListener('click', sendIn, false);
      });
    } else {
      // Show scroll-thumb
      document.documentElement.style.setProperty('--scroll-thumb', 0.08);
      // Add scroll-snap-type on showcase-wrapper
      navigationShowcase.classList.add('snappy');
      // Enabling clicking on items to show their text
      [...navigationShowcase.children].forEach(item => {
        item.addEventListener('click', sendIn, false);
      });
    }
  }

  /**
   * FUNCTION FOR FINDING WHAT ITEM IS CURRENTLY SHOWING
   */
  function findCurrentlyShowing() {
    let currentNumber = 0;
    // Setting a high start-value that i know currentNumber will be lower than on first iteration (screen width to make sure)
    let lowestNumber = window.innerWidth;
    let currentlyShowing;

    for (const item of itemIdAndPosition) {
      // Current distance number of every element, the lowest is the closest one
      currentNumber = Math.abs(
        item.element.getBoundingClientRect().left - contentPart.offsetLeft
      );

      // Finding the closest element (the one with the lowest number)
      if (currentNumber < lowestNumber) {
        lowestNumber = currentNumber;

        // Setting currently showing to with currently lowest number, when done with looping the item will be the correct one
        currentlyShowing = item;
      }
    }
    return currentlyShowing;
  }

  /**
   * FUNCTION DECIDING WHAT ELEMENT TO SCROLL TO BASED ON ELEMENT CLICKED IN NAVIGATION
   */

  // Counters for scrolling-positions (in case category has multiple elements)
  let i = 0;
  let at = 0;
  let max = 1;
  let category;
  let oldCategory;

  navigationWrapper.addEventListener(
    'click',
    function(e) {
      // Have to reverse the thing i did when creating the id's for the category items
      if (categories.includes(e.target.id.split('-').join(' '))) {
        closeText();

        // Disabling the navigation while animation runs
        navigationDisabled(true);

        // Find items that match category
        const correctItem = itemIdAndPosition.filter(
          item => item.category === e.target.id
        );

        // Taking category element
        category = correctItem[0].category;

        const currentlyShowing = findCurrentlyShowing().element;

        // Find active item
        const item = itemIdAndPosition.find(
          item => item.id === currentlyShowing.id
        );
        // What category are we in?
        const currentCategory = item.category;

        // What is the max index in this category?
        max = categoriesInfo[currentCategory];

        // Setting i to correct value based on where user is within a category
        // This makes it possible to scroll to next item in category by just clicking on the same category in navigation
        if (correctItem.length > 1 && category === oldCategory) {
          // What's the index of the item in this category?
          let index = item.index;

          // Set i to current index
          i = index;

          // Index++ because we are going to the next one
          index++;

          // Set at to this the new index, because this is where we are
          at = index;

          // If we are at a place higher than max, go to start again
          if (at > max) {
            i = 0;
            at = 0;
          }
        } else {
          // This is if a category only has 1 item or we changed cateogry
          i = 0;
          at = 0;

          if (category !== oldCategory) {
            document.documentElement.style.setProperty('--nav-item-border', 0);
          }
        }

        // If item in category only has one item, then we don't need to to any scrolling stuff
        if (max === 1 && category === oldCategory) {
          navigationDisabled(false);
          return;
        }

        // Checking if currently showing element is to the left or right of next item
        let animationClass =
          currentlyShowing.offsetLeft > correctItem[i].position
            ? 'out-right'
            : 'out-left';

        scrollAnimation(currentlyShowing, correctItem[i], animationClass);
      }
    },
    false
  );

  // Used for debouncing
  let timeoutS;

  // For keeping track of which element is active and doing some other stuff
  navigationShowcase.addEventListener(
    'scroll',
    function() {
      if (timeoutS) {
        window.cancelAnimationFrame(timeoutS);
      }

      timeoutS = window.requestAnimationFrame(function() {
        // Set currently showing to the element we see on page
        currentlyShowing = findCurrentlyShowing();

        // Updating category when scrolling
        oldCategory = currentlyShowing.category;

        // This is used for showing the scrolling left and right arrows on mobile devices
        const positionIndex = itemIdAndPosition.indexOf(currentlyShowing);

        // Set the opacity of the arrows based in where the element is placed in the navigation
        if (
          positionIndex !== 0 &&
          positionIndex !== itemIdAndPosition.length - 1
        ) {
          document.documentElement.style.setProperty('--left-scroll', 0.7);
          document.documentElement.style.setProperty('--right-scroll', 0.7);
        } else {
          if (positionIndex === 0) {
            document.documentElement.style.setProperty('--left-scroll', 0);
            document.documentElement.style.setProperty('--right-scroll', 0.7);
          }
          if (positionIndex === itemIdAndPosition.length - 1) {
            document.documentElement.style.setProperty('--right-scroll', 0);
            document.documentElement.style.setProperty('--left-scroll', 0.7);
          }
        }

        // Adding class 'active' to correct element and making sure the other elements don't have it
        itemIdAndPosition.forEach(item =>
          item !== currentlyShowing
            ? item.element.classList.remove('active')
            : item.element.classList.add('active')
        );

        [...navigationWrapper.children].forEach(tag => {
          // Here it comes in handy that the different items have class of category equal to nagivation-buttons id
          if (currentlyShowing.element.classList.contains(tag.id)) {
            const scaleX = currentlyShowing.index / categoriesInfo[tag.id];

            // Dynamically sets navigation-tag indication based on amount of items in category and what item is active
            document.documentElement.style.setProperty(
              '--nav-item-border',
              scaleX
            );

            if (!tag.classList.contains('navigation-active')) {
              tag.classList.add('navigation-active');
              document.title = `Mathias Picker - ${currentlyShowing.category
                .split('-')
                .join(' ')}`;
            }
          } else {
            tag.classList.remove('navigation-active');
          }
        });
      });
    },
    false
  );

  // Used for debouncing
  let timeoutR;

  window.addEventListener(
    'resize',
    function() {
      if (timeoutR) {
        window.cancelAnimationFrame(timeoutR);
      }

      timeoutR = window.requestAnimationFrame(function() {
        // Updating this list if user resizes
        itemIdAndPosition = [...navigationShowcase.children]
          .map(child => [
            {
              element: child,
              id: child.id,
              category: child.classList[1],
              position: child.offsetLeft,
              index: navigationItems.filter(c => c.id === child.id)[0].index
            }
          ])
          .flat();

        // Updating height to content part based on window height.
        document.documentElement.style.setProperty(
          '--content-height',
          `${window.innerHeight}px`
        );
      });
    },
    false
  );
}

/**
 * That's everything for now folks! Just over 1000 lines of commented code. I'm happy with that, considering all of the HTML (with 2 language versions) on the page was created here.
 * If you find any bugs or just want to discuss my code then please send an email to mathiaswpicker@gmail.com :)
 */
