$(document).ready(function(){

	function showlocation() {
		// One-shot position request.
		navigator.geolocation.getCurrentPosition(callback);
	};

	function callback(position) {

		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		ajaxCall(lat, lon);
	};

	showlocation();


	var ajaxCall = function(lat, lon){
		$.ajax({
			type: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&appid=77c20f1a32150f41c8e9cc0fd2a45e1d',
			success: function(data){
				console.log('success', data);
				var city = data.name;
				var country = data.sys.country;
				var wind = data.wind.speed;
				var temp = data.main.temp;
				var celsius = Math.round(temp - 273.15);
				var fahrenheit = Math.round(temp * (9/5) - 459.67);

				$('.city').append(city);
				$('.country').append(country);
				$('.wind').append(wind);
				$('.temp').append(fahrenheit + '°F');

				function toggle() {
					var isCelsius = false;
					$('.tempBtn').on('click', function(){

						if(isCelsius){
							$('.temp').html('<b>Temperature: </b>' + fahrenheit + '°F');
							isCelsius = false;

						}else{
							$('.temp').html('<b>Temperature: </b>' + celsius + '°C');
							isCelsius = true;
						}
					});
				}
				function background(){
					if(temp < 283){
						$('.container').css("background-image", "url(https://upload.wikimedia.org/wikipedia/commons/4/4a/Snow_on_the_mountains_of_Southern_California.jpg)");
					}else{
						$('.container').css("background-image", "url(http://weknowyourdreamz.com/images/desert/desert-04.jpg)");
					}
				}
				toggle();
				background();
			},
			error: function(){
				alert('Error loading');
			}
		});
	};
});