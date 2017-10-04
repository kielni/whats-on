/* global config, firebase, Vue, _, $, moment */
var db = firebase.initializeApp(config.firebase).database();

Vue.directive('gesture', {
  inserted: function (el, binding) {
    const hammertime = new Hammer(el);
    hammertime.on('swipe', function(ev) {
      //$('#action').text('swipe '+$(ev.target).closest('.show-card').attr('data'));
      binding.value(el, 'swipe');
    });
    hammertime.on('doubletap', function(ev) {
      //$('#action').text('doubletap '+$(ev.target).closest('.show-card').attr('data'));
      binding.value(el, 'doubletap');
    });
  }
});

// use vm for console debugging
// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: '#app',

  data: {
    shows: [],
  },

  firebase: {
    ref: {
      source: db.ref(),
      asObject: true,
      cancelCallback: function(err) {
        console.error('cancel error=', err);
      },
      readyCallback: function() {
        console.log('firebase ready');
      },
    }
  },

  methods: {
    gesture: function(ev, evType) {
      const showId = $(ev).attr('data');
      //$('#action').append(` | gesture ${evType} ${showId}`);
      if (evType === 'swipe') {
        const was = this.ref.shows[showId].watched;
        this.$firebaseRefs.ref.child(`shows/${showId}/watchedPrev`).set(was);
        this.$firebaseRefs.ref.child(`shows/${showId}/watched`).set(moment().format('YYYY-MM-DD'));
      }
      if (evType === 'doubletap') {
        // undo
        const prev = this.ref.shows[showId].watchedPrev;
        if (prev) {
          this.$firebaseRefs.ref.child(`shows/${showId}/watched`).set(prev);
        }
      }
    }
  },

  computed: {
    showIds: function() {
      return Object.keys(this.ref.shows || {});
    },

    loadedShows: function () {
      return this.showIds.length;
    },

    sortedShows: function() {
      //$('#action').text(`loaded ${Object.keys(this.ref.shows).length}`);
      console.log('shows=', this.ref.shows);
      // to array without paused
      const shows = [];
      Object.keys(this.ref.shows).forEach((s) => {
        const show = this.ref.shows[s];
        if (show.hide) {
          return;
        }
        shows.push({
          id: s,
          img: show.img,
          watched: show.watched,
          prettyDate: moment(show.watched).format('dddd MMM D'),
        });
      });
      // sort
      return shows.sort((a, b) => {
        return a.watched < b.watched ? -1 : 1;
      });
    },
  },
});
