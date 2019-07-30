<script type="text/javascript">
		$(document).on("click",function(e){
     		console.log(e);
			var url = $(e.target).attr("href");
            if($(e.target).attr("href") == undefined){
     			url = $(e.target).parent().attr("href");
     		} 
     		var lbl = $(e.target).text();
			console.log("LBL: " + lbl);
     		console.log("X: " + e.clientX + " Y: " + e.clientY);
     		//e.preventDefault();
            $.getJSON("/en/heatmap.snc?x="+e.clientX+"&y="+e.clientY+"&url="+encodeURIComponent(url)+"&page=\{{page.uid}}&lbl="+encodeURIComponent(lbl), function(data) {
                if (data.error != 0) { // Do we have an error?
                        console.log("message="+data.message);
                    }
            });
		});
</script>