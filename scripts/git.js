function call_git() {
	fetch('https://api.github.com/users/UtopicUnicorns/events')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			let array = [];

			for (let i of data) {
				let date = new Date(i.created_at);
				let year = date.getFullYear();
				let month = ('0' + (date.getMonth() + 1)).substr(-2);
				let day = ('0' + date.getDate()).substr(-2);
				let hour = ('0' + date.getHours()).substr(-2);
				let minutes = ('0' + date.getMinutes()).substr(-2);
				let seconds = ('0' + date.getSeconds()).substr(-2);

				let time = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

				let author = { name: i.actor.login, pic: i.actor.avatar_url, link: `https://github.com/${i.actor.login}` };

				let repo = { name: i.repo.name, url: i.repo.url.replace('api.', '').replace('/repos', ''), head: i.payload.ref };

				if (i.payload.commits) {
					var title = { name: i.payload.commits[0].message.split('\n\n')[0], comment: i.payload.commits[0].message.split('\n\n')[1] };
				} else var title = { name: '=!', comment: '=!' };

				array.push(`
					<h3>
						<a href="${author.link}" target="_blank" class="pulse">${author.name}</a> @ ${time}
					</h3>
					<p style="background-image: url('${author.pic}'); background-repeat: no-repeat; background-position: center right; background-size: contain;">
						Title: ${title.name}<br /> -- <br />
						Comments: ${title.comment}

						<br />
						<br />
						@<a href="${repo.url}" target="_blank" class="pulse">${repo.name}</a> / ${repo.head}
					</p>
					`);
			}

			let content_grab = document.getElementById('git');

			content_grab.innerHTML = array.slice(0, 5).join('');
		});
}
