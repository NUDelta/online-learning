templateOrder = {
  'first':'compare1',
  'second': 'compareFeedback',
  'third': 'teachingModule1',
  'fourth': 'teachingModule2',
  'fifth': 'verticalLines',
  'sixth': 'rangeExercise',
  'seventh': 'choose-1'
}

heatMapWeight = {
  "cosmetic": 50,
  "minor": 75,
  "major": 100,
  "catastrophic": 125
};

imageMap = {
  'test1': 'heatmapArea1',
  'test2': 'heatmapArea2'
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
        return {reports: reports, imageClass: imageMap[this.params._test]};
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
      ctx.moveTo(10,0);
      ctx.lineTo(10, 400);
      ctx.stroke();

      var d = document.getElementById("michaels_form_canvas");
      var dtx = d.getContext("2d");
      dtx.moveTo(350,0);
      dtx.lineTo(350,400);
      dtx.stroke();

      dtx.moveTo(190,0);
      dtx.lineTo(190,400);
      dtx.stroke();
      var description = "Both forms contain strong vertical lines - the form on the left is vertically aligned to the left and the form on the right is vertically aligned to the right.";
      $("#description").html(description);
    }, 
    'mouseleave #strongVertical': function() {
      var c = document.getElementById("target_form_canvas");
      var context = c.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, c.width, c.height);

      var d = document.getElementById("michaels_form_canvas");
      var dontext = d.getContext('2d');
      dontext.beginPath();
      dontext.clearRect(0,0, d.width, d.height);
      $("#description").html("");

    },
    'mouseover #buttonLine': function() {
      var c = document.getElementById("target_form_canvas");
      var ctx = c.getContext("2d");
      ctx.moveTo(10,0);
      ctx.lineTo(10, 400);
      ctx.stroke();

      var d = document.getElementById("michaels_form_canvas");
      var dtx = d.getContext("2d");
      dtx.moveTo(345,0);
      dtx.lineTo(345,400);
      dtx.stroke();

      var description = "Both forms have buttons that help advance the forms.  In one form, the button is aligned to the left ON the strong vertical line, and in the other form, the button is aligned to the right on the strong vertical line as well.";
      $("#description").html(description);
    }, 
    'mouseleave #buttonLine': function() {
      var c = document.getElementById("target_form_canvas");
      var context = c.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, c.width, c.height);

      var d = document.getElementById("michaels_form_canvas");
      var dontext = d.getContext('2d');
      dontext.beginPath();
      dontext.clearRect(0,0, d.width, d.height);
      $("#description").html("");
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
      try {
        weakLines = JSON.parse($('#weakArray').val());
      }
      catch(err) {
        weakLines = [];
      }
      try {
        strongLines = JSON.parse($('#strongArray').val());
      }
      catch(err) {
        strongLines = [];
      }
      
      //differentials = strong - weak
      userDifferential = strongLines.length - weakLines.length;
      LineDifferentials.insert({image: 'test1', differential: userDifferential});
      
      Router.go('/written-heuristics/1');

    }
  });

  Template.StrongLineHeuristic2.events({
    'click #submit': function() {
      weakLines = JSON.parse($('#weakArray').val());
      strongLines = JSON.parse($('#strongArray').val());
      
      //differentials = strong - weak
      userDifferential = strongLines.length - weakLines.length;
      LineDifferentials.insert({image: 'test2', differential: userDifferential});
    
      Router.go('/written-heuristics/2');
    }
  });

  // Written Heuristics code
  Template.WrittenHeuristic1.events({
    'click #submit': function() {
      submittedPriority = $("#priority").val();
      submittedProblem = $("#problem").val();
      submittedFix = $("#fix").val();
      try {
        submittedCoordinates = JSON.parse($("#coordinates").val());
      } catch(err){
        alert("Select the area on the image where the problem is located!");
      }
      var c = document.getElementById("test1");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0,0,c.width, c.height);   

      WrittenHeuristics.insert({image: 'test1', priority: submittedPriority, problem: submittedProblem, fix: submittedFix, date_created: Date.now(), coordinates: submittedCoordinates });
      $("#priority").val("");
      $("#problem").val("");
      $("#fix").val("");
      $("#coordinates").val("");
      $("#heuristic").fadeOut(function(){
        $("#more").fadeIn();
      });
    },

    'click #exit': function(){
      Router.go('/view-heuristics/test1');
    },

    'click #submitMore': function(){
      $("#more").fadeOut(function(){
        $("#heuristic").fadeIn('slow');
      });
    }
  });

  Template.WrittenHeuristic2.events({
    'click #submit': function() {
      submittedPriority = $("#priority").val();
      submittedProblem = $("#problem").val();
      submittedFix = $("#fix").val();
      try {
        submittedCoordinates = JSON.parse($("#coordinates").val());
      } catch(err){
        alert("Select the area on the image where the problem is located!");
      }

      var c = document.getElementById("test2");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0,0,c.width, c.height);  

      WrittenHeuristics.insert({image: 'test2', priority: submittedPriority, problem: submittedProblem, fix: submittedFix, date_created: Date.now(), coordinates: submittedCoordinates});
      $("#priority").val("");
      $("#problem").val("");
      $("#fix").val("");
      $("#coordinates").val("");
      $("#heuristic").fadeOut(function(){
        $("#more").fadeIn('slow');
      });
    },

    'click #exit': function(){
      Router.go('/view-heuristics/test2');
    },

    'click #submitMore': function(){
      $("#more").fadeOut(function(){
        $("#heuristic").fadeIn('slow');
      });
    }
  });


  Template.ViewHeuristics.events({
    'click #loadMap': function() {
      image = Router.current().path.substring(17);
      $("#loadMap").hide();
      $("#" + imageMap[image]).removeClass("grayedOut");
      reports = WrittenHeuristics.find({image: image}, {sort: {date_created: -1}}).fetch();

      heatMapData = {
        max: 200,
        data: []
      };

      for(var i=0; i < reports.length; i++){
        newObject = {x: reports[i].coordinates[0], y: reports[i].coordinates[1], count: heatMapWeight[reports[i].priority]};
        heatMapData.data.push(newObject);
      }

      config = {
        element: document.getElementById(imageMap[image]),
        radius: 30,
        opacity: 50,
        gradient: { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
      };
      //creates and initializes the heatmap
      heatmap = h337.create(config);
      heatmap.store.setDataSet(heatMapData);
    },
    'change #priority': function() {
      priority = $("#priority").val();
      image = Router.current().path.substring(17);
      reports = WrittenHeuristics.find({image: image, priority: priority}, {sort: {date_created: -1}}).fetch();

      heatMapData = {
        max: 200,
        data: []
      };

      for(var i=0; i < reports.length; i++){
        newObject = {x: reports[i].coordinates[0], y: reports[i].coordinates[1], count: heatMapWeight[reports[i].priority]};
        heatMapData.data.push(newObject);
      }

      heatmap.store.setDataSet({data:[]});
      heatmap.store.setDataSet(heatMapData);

    }
  });

  Template.ViewHeuristics.priorities = function(){
    image = Router.current().path.substring(17);
    var list = [["Cosmetic Problems: ", 0],["Minor Problems: ", 0],["Major Problems: ", 0], ["Catastrophic Problems: ", 0]];
    cosmetic = WrittenHeuristics.find({image: image, priority: 'cosmetic'}).fetch();
    list[0][1] = cosmetic.length;
    minor = WrittenHeuristics.find({image: image, priority: 'minor'}).fetch();
    list[1][1] = minor.length;
    major = WrittenHeuristics.find({image: image, priority: 'major'}).fetch();
    list[2][1] = major.length;
    catastrophic = WrittenHeuristics.find({image: image, priority: 'catastrophic'}).fetch();
    list[3][1] = catastrophic.length;

    warningClasses = {
      0: "list-group-item-info",
      1: "list-group-item-info",
      2: "list-group-item-warning",
      3: "list-group-item-danger"
    };

    newArray = ["","","",""];
    for(var i=0; i <list.length; i++){
      newArray[i] = list[i][0] + list[i][1];
    }
    return newArray;
  }

  Template.ViewHeuristics.prioritiesList = function(){
    list = ["Cosmetic Problems: ", "Minor Problems: ", "Major Problems: ", "Catastrophic Problems: "];
    return list;
  }

  Template.ViewHeuristics.averageDifferentials = function(){
    image = Router.current().path.substring(17);
    differentials = LineDifferentials.find({image: image}).fetch();
    console.log("Differential array: " + differentials);
    var total = 0;
    $.each(differentials,function() {
        total += this.differential;
    });
    console.log(total);

    var avg = total / differentials.length;
    return avg;
  }

  Template.ViewHeuristics.greaterThanOrLessThan = function(){
    image = Router.current().path.substring(17);
    differentials = LineDifferentials.find({image: image}).fetch();
    console.log("Differential array: " + differentials);
    var total = 0;
    $.each(differentials,function() {
        total += this.differential;
    });
    console.log(total);

    var avg = total / differentials.length;
    
    if (avg > 0){
      return true;
    } else {
      return false;
    }
  }

  Template.ViewHeuristics.totalUsers = function(array){
    return array.length;
  } 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

