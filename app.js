/* global config, firebase, Vue, _, $, moment */
var fb = firebase.initializeApp(config.firebase);
var db = fb.database();
console.log('create database');

firebase.auth().signInAnonymously()
  .then(() => {
    console.log('signInAnonymously ok')
    db = fb.database();
  })
  .catch((error) => {
    console.log('signInAnonymously error: ', error);
  });

Vue.use(AlloyFingerVue);

// use vm for console debugging
// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: '#app',

  data: {
    shows: [],
    ref: {},
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
    swipe: function(ev) {
      const showId =  $(ev.target).closest('.show-card').attr('data');
      const was = this.ref.shows[showId].watched;
      const direction = ev.direction;

      if (!(direction === 'Left' || direction === 'Right')) {
        return;
      }

      this.$firebaseRefs.ref.child(`shows/${showId}/watchedPrev`).set(was);
      this.$firebaseRefs.ref.child(`shows/${showId}/watched`).set(moment().format('YYYY-MM-DD'));
    },

    undo: function(ev) {
      // undo
      const showId = $(ev.target).closest('.show-card').attr('data')
      const prev = this.ref.shows[showId].watchedPrev;

      if (prev) {
        console.log(`undo: ${showId} to ${prev}`);
        this.$firebaseRefs.ref.child(`shows/${showId}/watched`).set(prev);
      }
    },
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
