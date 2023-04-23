AFRAME.registerComponent('navigator', {
  schema: {
    previousLocation: {type: 'string', default: 'neighbourhood'},
    currentLocation: {type: 'string', default: 'skyShot'}
  },

  init: function () {
    this.createPlace()
  },

  tick: function (time, timeDelta) {
    var currentLocation = this.data.currentLocation
    var previousLocation = this.data.previousLocation
    if(currentLocation != previousLocation){
      this.createPlace()
      this.el.setAttribute('navigator', {previousLocation: currentLocation})
    }
  },

  createPlace: function() {
    const locationList = {
      neighbourhood:{
        title: 'My Neighbourhood',
        id: 'neighbourhood',
        links: {
          garden: {position: {x: 6, y: 0, z: -6}, rotation: {x: 0, y: -30, z: 0}, title: 'Garden'},
          room: {position: {x: 2, y: 4, z: -10}, rotation: {x: 0, y: -10, z: 0}, title: 'Room'},
          skyShot: {position: {x: -10, y: 10, z: -20}, rotation: {x: 0, y: 5, z: 0}, title: 'City'}
        }
      },
      garden: {
        title: 'My Garden',
        id: 'garden',
        links: {
          neighbourhood: {position: {x: -3, y: 0, z: -10}, rotation: {x: 0, y: 5, z: 0}, title: 'Neighbourhood'},
          skyShot: {position: {x: -7, y: 13, z: -20}, rotation: {x: 0, y: 5, z: 0}, title: 'City'}
        }
      },
      room: {
        title: 'My Room',
        id: 'room',
        links: {
          garden: {position: {x: -10, y: 2, z: 0}, rotation: {x: 0, y: 90, z: 0}, title: 'Garden'},
          neighbourhood: {position: {x: 15, y: 2, z: -2}, rotation: {x: 0, y: -90, z: 0}, title: 'Neighbourhood'}
        }
      },
      skyShot: {
        title: 'My City',
        id: 'skyShot',
        links: {
          garden: {position: {x: -2, y: -8, z: -6}, rotation: {x: -90, y: -30, z: 0}, title: 'Garden'},
          room: {position: {x: 1, y: -4, z: -6}, rotation: {x: -70, y: -20, z: 0}, title: 'Room'},
          neighbourhood: {position: {x: 4, y: -4, z: -6}, rotation: {x: -80, y: -50, z: 0}, title: 'Neighbourhood'}
        }
      }
    }

    currentLocation = locationList[this.data.currentLocation]
    
    this.cleanUp()

    var mainContainer = this.el

    var skyBox = document.querySelector('#sky-box')
    skyBox.setAttribute("material", {
      src: `./assets/${currentLocation.id}.jpg`,
      color: "white"
    });

    var title = document.querySelector('#title')
    title.setAttribute("text", {
      value: currentLocation.title
    });

    var linkEntity = document.createElement('a-entity')
    var linkData = Object.entries(currentLocation.links)
    for(i = 0; i < linkData.length; i++){
      linkEntity.appendChild(this.createLink(linkData[i]))
    }

    mainContainer.appendChild(linkEntity)
  },

  cleanUp: function() {
    var mainContainer = this.el

    while(mainContainer.firstChild) {
      mainContainer.removeChild(mainContainer.lastChild);
    }
  },

  createLink: function(linkData) {
    linkId = linkData[0]
    linkPosition = linkData[1].position
    linkRotation = linkData[1].rotation
    linkTitle = linkData[1].title

    var link = document.createElement('a-entity')
    var linkText = document.createElement('a-entity')

    link.setAttribute('id', linkId)
    link.setAttribute('position', linkPosition)
    link.setAttribute('rotation', linkRotation)
    link.setAttribute('geometry', {primitive: 'ring', radiusOuter: 0.5, radiusInner: 0.001})
    link.setAttribute('material', {color: 'white'})
    link.setAttribute('event-handler', {})

    linkText.setAttribute('position', {z: 0.01})
    linkText.setAttribute('text', {font: 'exo2bold', align: 'center', width: 10, color: '#000', value: linkTitle})

    link.appendChild(linkText)
    return link
  }
});
