$(document).ready(function () {
	var newsSource = document.getElementById("release-template").innerHTML,
		template = Handlebars.compile(newsSource);

	$.getJSON('release.json', function (json) {
		json.releases = json.releases.sort(function (a, b) {
			// Turns your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(b.date) - new Date(a.date);
		});

		json.releases = json.releases.slice(0, 3);

		var data = template(json);
		$('.news').html(data);
	});

	Handlebars.registerHelper('formatDate', function (date, format) {
		return moment(date).format(format);
	});

	Handlebars.registerHelper('truncate', function (text, num) {
		return text.substr(0, num) + '...';
	});
});