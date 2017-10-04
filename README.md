# What's on

Display list of TV shows, from longest-ago watched to most recent.

Swipe to set watched to today and show to the end of the list. Double tap to undo.

Get data from <a href="https://firebase.google.com/">Firebase</a> via
<a href="https://github.com/vuejs/vuefire">VueFire</a> and display with
<a href="https://vuejs.org/">Vue.js</a> and
<a href="http://getbootstrap.com/docs/3.3/">Boostrap 3</a>.
Get swipe and double tap events with
<a href="http://hammerjs.github.io/">hammer.js</a>

Sample Firebase data

````
{
  "shows" : {
    "Dark Matter" : {
      "img" : "https://images-na.ssl-images-amazon.com/images/M/MV5BYjI5OGMxNzYtZmZiYS00NDI1LWI4NWMtOTZmNjY1MjMzZjExXkEyXkFqcGdeQXVyNTgxMjE3OTQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
      "watched" : "2017-09-21",
      "watchedPrev" : "2017-09-14"
    },
    "Dr Who" : {
      "img" : "https://images-na.ssl-images-amazon.com/images/M/MV5BNGJiYmExMDktNmJjOS00NTE0LWI2ZmYtN2EyNjUzNjBmMjlkXkEyXkFqcGdeQXVyNjcwODY0NzQ@._V1_.jpg",
      "watched" : "2017-08-04",
      "watchedPrev" : "2017-08-01"
    }
}
````

Sample config.js

````
var config = {
  firebase: {
    apiKey: "123abc",
    databaseURL: "https://my-firebase.firebaseio.com",
    projectId: "my-firebase"
  },
};
```
