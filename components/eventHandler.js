AFRAME.registerComponent('event-handler', {
  init: function () {
    this.eventCreation()
  },

  eventCreation: function(){
    this.el.addEventListener('click', function(e){
      var mainContainer = document.querySelector('#main-container')
      mainContainer.setAttribute('navigator', {currentLocation: e.target.id})
    })
  }
});
