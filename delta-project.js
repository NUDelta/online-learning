templateOrder = {
  'first':'compare1',
  'second': 'compareFeedback',
  'third': 'teachingModule1',
  'fourth': 'teachingModule2',
  'fifth': 'verticalLines',
  'sixth': 'rangeExercise',
  'seventh': 'choose-1'
}

LineDifferentials = new Meteor.Collection("lineDifferentials");
StrongLines = new Meteor.Collection("strongLines");
WeakLines = new Meteor.Collection("weakLines");
WrittenHeuristics = new Meteor.Collection("writtenHeuristics");


if(Meteor.isClient){

  // Routing the entire 
  Router.map(function () {
    this.route('first-block', {
      path: '/1', // match the root path
      template: templateOrder.first,
      data: {
        current: 1
      }
    }),
    this.route('second-block', {
      path: '/2',
      template: templateOrder.second,
      data: {
        current: 2
      }
    }),
    this.route('third-block', {
      path: '/3',
      template: templateOrder.third,
      data: {
        current: 3
      }
    }),
    this.route('fourth-block', {
      path: '/4',
      template: templateOrder.fourth,
      data: {
        current: 4
      }
    }),
    this.route('fifth-block', {
      path: '/5',
      template: templateOrder.fifth,
      data: {
        current: 5
      }
    }),
    this.route('sixth-block', {
      path: '/6',
      template: templateOrder.sixth,
      data: {
        current: 6
      }
    }),
    this.route('seventh-block', {
      path: '/7',
      template: templateOrder.seventh,
      data: {
        current: 7
      }
    });

    this.route('BeginHeuristics', {
      path: '/begin-heuristics',
      template: 'BeginHeuristics'
    });

    this.route('StrongLinesHeuristics1', {
      path: '/strong-line-heuristics/1',
      template: 'StrongLineHeuristic1'
    });

    this.route('StrongLinesHeuristics2', {
      path: '/strong-line-heuristics/2',
      template: 'StrongLineHeuristic2'
    });

    this.route('WrittenHeuristics1', {
      path: '/written-heuristics/1',
      template: 'WrittenHeuristic1'
    });
    this.route('WrittenHeuristics2', {
      path: '/written-heuristics/2',
      template: 'WrittenHeuristic2'
    });

    this.route('ViewHeuristics', {
      path: '/view-heuristics/:_test',
      template: 'ViewHeuristics',
      data: function(){
        console.log(this.params._test);
        differentials = LineDifferentials.find({image: this.params._test}).fetch();
        reports = WrittenHeuristics.find({image: this.params._test}, {sort: {date_created: -1}}).fetch();
        return {differentials: differentials, reports: reports};
      }
    });
  });

  /*

    Template event listeners

  */  

  Template.compareFeedback.events({
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    },
    'mouseover #strongVertical': function() {
      var c = document.getElementById("target_form_canvas");
      var ctx = c.getContext("2d");
      ctx.moveTo(20,0);
      ctx.lineTo(20, 400);
      ctx.stroke();
    }, 
    'mouseleave #strongVertical': function() {
      var c = document.getElementById("target_form_canvas");
      var context = c.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, c.width, c.height);
    }
  });

  Template.teachingModule1.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });
  Template.teachingModule2.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });
  Template.verticalLines.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });
  Template.rangeExercise.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });
  Template.compare1.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });

  /*Template.BeginHeuristics.events({

  });*/

  Template.StrongLineHeuristic1.events({
    'click #submit': function() {
      weakLines = JSON.parse($('#weakArray').val());
      strongLines = JSON.parse($('#strongArray').val());
      
      //differentials = strong - weak
      userDifferential = strongLines.length - weakLines.length;
      LineDifferentials.insert({image: 'test1', differential: userDifferential});
    }
  });

  Template.StrongLineHeuristic2.events({
    'click #submit': function() {
      weakLines = JSON.parse($('#weakArray').val());
      strongLines = JSON.parse($('#strongArray').val());
      
      //differentials = strong - weak
      userDifferential = strongLines.length - weakLines.length;
      LineDifferentials.insert({image: 'test2', differential: userDifferential});
    }
  });

  // Written Heuristics code
  Template.WrittenHeuristic1.events({
    'click #submit': function() {
      submittedPriority = $("#priority").val();
      submittedProblem = $("#problem").val();
      submittedFix = $("#fix").val();

      WrittenHeuristics.insert({image: 'test1', priority: submittedPriority, problem: submittedProblem, fix: submittedFix, date_created: Date.now() });
      $("#priority").val("");
      $("#problem").val("");
      $("#fix").val("");
      $("#heuristic").fadeOut(function(){
        $("#werd").fadeIn(function(){
          setTimeout(function(){
            $("#werd").fadeOut(function(){
              $("#heuristic").fadeIn();
            });
          }, 1500);
        });
      });
    }
  });

  Template.WrittenHeuristic2.events({
    'click #submit': function() {
      submittedPriority = $("#priority").val();
      submittedProblem = $("#problem").val();
      submittedFix = $("#fix").val();

      WrittenHeuristics.insert({image: 'test2', priority: submittedPriority, problem: submittedProblem, fix: submittedFix});
      $("#priority").val("");
      $("#problem").val("");
      $("#fix").val("");
      $("#heuristic").fadeOut(function(){
        $("#werd").fadeIn(function(){
          setTimeout(function(){
            $("#werd").fadeOut(function(){
              $("#heuristic").fadeIn();
            });
          }, 1500);
        });
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

