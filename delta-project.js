templateOrder = {
  'first':'compare-1',
  'second': 'teaching-module-1',
  'third': 'teaching-module-2',
  'fourth': 'vertical_lines',
  'fifth': 'range_exercise',
  'sixth': 'choose-1'
}

if (Meteor.isClient) {
  //Template.hello.greeting = function () {
  //  return "Welcome to delta-project.";
  //};


  Router.map(function () {
    this.route('first-block', {
      path: '/1', // match the root path
      template: templateOrder.first
    }),
    this.route('second-block', {
      path: '/2',
      template: templateOrder.second
    }),
    this.route('third-block', {
      path: '/3',
      template: templateOrder.third
    }),
    this.route('fourth-block', {
      path: '/4',
      template: templateOrder.fourth
    }),
    this.route('fifth-block', {
      path: '/5',
      template: templateOrder.fifth
    }),
    this.route('sixth-block', {
      path: '/6',
      template: templateOrder.sixth
    });
  });

  //
  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
