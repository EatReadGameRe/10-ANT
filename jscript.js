$( document ).ready(function() {

    jsPsych.init({
             timeline: attention_network_task_experiment,
             display_element: "getDisplayElement",
             fullscreen: true,
             on_trial_finish: function(data){
               addID('attention-network-task');
             },

             on_finish: function(data){

                 // Serialize the data
                 var promise = new Promise(function(resolve, reject) {
                     var data = jsPsych.data.dataAsJSON();
                     resolve(data);
                 });

                 promise.then(function(data) {


                     $.ajax({
                         type: "POST",
                         url: '/save',
                         data: { "data": data },
                         success: function(){ document.location = "/next"; },
                         dataType: "application/json",

                         // Endpoint not running, local save
                         error: function(err) {

                             if (err.status == 200){
                                 document.location = "/next";
                             } else {
                                 // If error, assue local save
                                 jsPsych.data.localSave('attention-network-task_results.csv', 'csv');
                             }
                         }
                     });
                 });
             }

      });
});
