var nbrprams = $('#nbrprams').val();
var sel_params = {};
var selID = $('.param1').val();
subtotal = 0;

//available parameters
param1 = $('.param1:radio:checked').val();
param2 = $('.param2:radio:checked').val();
param3 = $('.param3:radio:checked').val();
param4 = $('.param4:radio:checked').val();


if(param1 !== undefined || param1 !== ""){
    sel_params['param1'] = param1;
}

if(param2 !== undefined || param2 !== ""){
    sel_params['param2'] = param2;
}

if(param3 !== undefined || param3 !== ""){
    sel_params['param3'] = param3;
}

if(param4 !== undefined || param4 !== ""){
    sel_params['param4'] = param4;
}


//on load, set default param and estimate cost
default_param(selID);
 
 
    function drawPlot(min, max, avg){
    
      var line1 = [[min*(70/100), 0,  null], [min, 0.1,  "min: " + min], [max, 0.1, "max: " + max], [avg, 0.8, "moyen: $" + avg], [max*(120/100), 0, null],];
      
          var plot = $.jqplot('chart1', [line1], {
            // title: '\{{plot_title}}', 
            seriesDefaults: {
              rendererOptions: {smooth: true},
              showMarker:true, 
              pointLabels:{ show:true }
            },
            axesDefaults: {
               showTickMarks:true
            },  
            axes:{ 
                xaxis:{ 
                    pad: 0 
                }, 
                yaxis:{ 
                    pad: 1.5 
                }   
            }
          });
          
          plot.replot();
    }
    
    
    /**
     * 
     **/
    function nbrParams(params){
        var count=0;
        
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
               ++count;
            }
        }
        return count;
    }
    
    
    
    /**
     * 
     **/
    function estimate(params,subtotal){
        default_price = '';
        
        if(subtotal === undefined){
            subtotal = 0;
        }
        
        $.ajax({
            type: "POST",
            data: params,
            beforeSend: function(){
            },
            
            success: function(data, statusText, xhr) {
                //initialize fixed min, max and avg price for this combination
                var min_price = xhr.getResponseHeader('X-min-cost');
                var max_price = xhr.getResponseHeader('X-max-cost');
                var avg_price = xhr.getResponseHeader('X-avg-cost');
                
                //alert(xhr.getResponseHeader('X-debug'));
                //initialize fixed units number for this combination
                var u1 = parseInt(($('#unit1').val() === undefined || $('#unit1').val() === "") ? 0 : $('#unit1').val());
                var u2 = parseInt(($('#unit2').val() === undefined || $('#unit2').val() === "") ? 0 : $('#unit2').val());
                var u3 = parseInt(($('#unit3').val() === undefined || $('#unit3').val() === "") ? 0 : $('#unit3').val());
                var u4 = parseInt(($('#unit4').val() === undefined || $('#unit4').val() === "") ? 0 : $('#unit4').val());
                
                //initialize user units entries and unit cost level for parameter 1 if provided.
                var p1 = parseInt(($('#param1_val').val() === undefined) ? 0 : $('#param1_val').val());
                var c1_min =  parseFloat(($('#min_unit1_cost').val() === undefined) ? 0 : $('#min_unit1_cost').val());
                var c1_max =  parseFloat(($('#max_unit1_cost').val() === undefined) ? 0 : $('#max_unit1_cost').val());
                var c1_avg =  parseFloat(($('#avg_unit1_cost').val() === undefined) ? 0 : $('#avg_unit1_cost').val());
                
                //initialize user units entries and unit cost level for parameter 2 if provided.
                var p2 = parseInt(($('#param2_val').val() === undefined) ? 0 : $('#param2_val').val());
                var c2_min =  parseFloat(($('#min_unit2_cost').val() === undefined) ? 0 : $('#min_unit2_cost').val());
                var c2_max =  parseFloat(($('#max_unit2_cost').val() === undefined) ? 0 : $('#max_unit2_cost').val());
                var c2_avg =  parseFloat(($('#avg_unit2_cost').val() === undefined) ? 0 : $('#avg_unit2_cost').val());
                
                //initialize user units entries and unit cost level for parameter 3 if provided.
                var p3 = parseInt(($('#param3_val').val() === undefined) ? 0 : $('#param3_val').val());
                var c3_min =  parseFloat(($('#min_unit3_cost').val() === undefined) ? 0 : $('#min_unit3_cost').val());
                var c3_max =  parseFloat(($('#max_unit3_cost').val() === undefined) ? 0 : $('#max_unit3_cost').val());
                var c3_avg =  parseFloat(($('#avg_unit3_cost').val() === undefined) ? 0 : $('#avg_unit3_cost').val());
                
                //initialize user units entries and unit cost level for parameter 4 if provided.
                var p4 = parseInt(($('#param4_val').val() === undefined) ? 0 : $('#param4_val').val());
                var c4_min =  parseFloat(($('#min_unit4_cost').val() === undefined) ? 0 : $('#min_unit4_cost').val());
                var c4_max =  parseFloat(($('#max_unit4_cost').val() === undefined) ? 0 : $('#max_unit4_cost').val());
                var c4_avg =  parseFloat(($('#avg_unit4_cost').val() === undefined) ? 0 : $('#avg_unit4_cost').val());
                
                
                //make sure to always use default u's variables in case of wrong user input or inputs less than fixed units. 
                p1 = (p1 < u1 || p1 === "") ? u1 : p1;
                p2 = (p2 < u2 || p2 === "") ? u2 : p2;
                p3 = (p3 < u3 || p3 === "") ? u3 : p3;
                p4 = (p4 < u4 || p4 === "") ? u4 : p4;
                
                m =( $('#multiplier_val').val() === undefined || $('#multiplier_val').val() === "" || $('#multiplier_val').val() === '0') ? 1 : parseFloat($('#multiplier_val').val());
                
                //alert("(" + c1_avg + "*" + "(" + p1 + "-" + u1 + ")" + " +" + c2_avg + "*" + "(" + p2 + "-" + u2 + ")" + " + " + c3_avg + "*" + "(" + p3 + "-" + u3 + ")" + ")" + m);
                
                
                //formula to calculate total of minimum cost
                var minres =  (parseFloat((c1_min * (p1 - u1)) + (c2_min * (p2 - u2)) + (c3_min * (p3 - u3))) + parseFloat(min_price)) * m;
                    minres = parseFloat(minres.toFixed(2)) + parseFloat(subtotal);
                //formula to calculate total of maximum cost
                var maxres =  (parseFloat((c1_max * (p1 - u1)) + (c2_max * (p2 - u2)) + (c3_max * (p3 - u3))) + parseFloat(max_price)) * m;
                    maxres = parseFloat(maxres.toFixed(2)) + parseFloat(subtotal);
                //formula to calculate total of average cost and display average total cost by default.
                var avgres =  (parseFloat((c1_avg * (p1 - u1)) + (c2_avg * (p2 - u2)) + (c3_avg * (p3 - u3))) + parseFloat(avg_price)) * m;
                    avgres = parseFloat(avgres.toFixed(2)) + parseFloat(subtotal);
                    
                if(minres === "" || isNaN(minres)){
                    minres = 0;
                }
                
                if(maxres === "" || isNaN(maxres)){
                    maxres = 0;
                }
                
                if(avgres === "" || isNaN(avgres)){
                    avgres = 0;
                }
                
                $('#graph_min').val(minres);
                $('#graph_max').val(maxres);
                $('#graph_avg').val(avgres);
                $('#total').html(avgres + ' $');

                //callback function to draw the plot dynamically
                result = drawPlot(minres, maxres, avgres);
                
            }
        });
    }


    function add_other_param(uid,idparam){
        if($('#other_' + uid).is(":checked")){
            subtotal = subtotal + (parseFloat($('#multiplier_val').val()) * parseFloat($('#other_cost_' + uid).val()));
        }else{
            subtotal = subtotal - (parseFloat($('#multiplier_val').val()) * parseFloat($('#other_cost_' + uid).val()));
        }
        
        estimate(sel_params,subtotal);
    }
    
    
    function default_param(id){
        if(!$('.param2').length){
            estimate(sel_params);
        }else{
            $.ajax({
                type: "POST",
                data: {"p1":id},
                success: function(data, statusText, xhr) {
                    a = JSON.parse(xhr.getResponseHeader('X-selected'));
                    $('.param2').prop('disabled',true);
                   
    
                     $('.user_units').prop('disabled',true);
                      $('.user_multiplier').prop('disabled',true);
                    
                    for(var i=0; i < a.length; i++) {
                        if(i===0){
                            $('#param_'+a[i].param2).prop('checked',true);
                            $('#param_'+a[i].param2).trigger('change');
                        }
                        $('#param_'+a[i].param2).prop('disabled',false);
                        $('.user_units').prop('disabled',false);
                        $('.user_multiplier').prop('disabled',false);
    
                    }
                }
            });
        }
    }
    

    function add_param1(id){
        $('#calculator').val(0);
        sel_params['param1'] = id;
        //$('.param2').prop('checked',false);
        default_param(id);
        
        if(!$('.param2').length){
            estimate(sel_params);
        }
    }
    
    function add_param2(id){
        $('#calculator').val(0);
        sel_params['param2'] = id;
        
        if(nbrParams(sel_params) >= nbrprams){
            estimate(sel_params);
        }
            
    }

    function add_param3(id){
        $('#calculator').val(0);
        sel_params['param3'] = id;
        
        if(nbrParams(sel_params) >= nbrprams){
            estimate(sel_params);
        }
    }

    function add_param4(id){
        $('#calculator').val(0);
        sel_params['param4'] = id;

        if(nbrParams(sel_params) >= nbrprams){
            estimate(sel_params);
        }
    }
    
    function updatePrice(element){
        if(nbrParams(sel_params) >= nbrprams && $(element).val() != ""){
            estimate(sel_params);
        }
    }
    
    $(".user_units").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
            //display error message
            return false;
        }
    });
    
    $(".user_multiplier").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
            //display error message
            return false;
        }
    });

</script>
