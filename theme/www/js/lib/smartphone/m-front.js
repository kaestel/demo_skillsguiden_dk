Util.Modules["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized", this);

			var i, node;

			if(this.loading) {
				u.ass(this.loading, {
					"height": page.browser_h + "px",
				});
			}

			if(u.segment() === "desktop" || u.segment() === "desktop_guide") {

				if(this.div_intro) {
					// u.ass(this.div_intro, {
					// 	"height": (page.browser_h * 0.8) + "px",
					// });
				}


				if(this.div_rolemodels && this.rolemodels) {
				}


				if(this.div_podcasts) {

					if(this.edge_podcast) {

						if(u.hc(this.div_podcasts, "collapsed")) {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
							});
						}
						else {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.last_podcasts) - u.absY(this.div_podcasts)) + (this.last_podcasts.offsetHeight) + 100 + "px"
							});
						}

					}

				}


				if(this.div_events) {
				}


				// if(this.div_skillsuniverset) {
				// 	u.ass(this.div_skillsuniverset, {
				// 		"height": (page.browser_h * 0.8) + "px",
				// 	});
				// }


			}
			else {

				if(this.div_intro) {
					// u.ass(this.div_intro, {
					// 	"height": page.browser_h + "px",
					// });
				}


				if(this.div_rolemodels && this.rolemodels) {
					for(i = 0; i < this.rolemodels.length; i++) {
						node = this.rolemodels[i];
						u.ass(node.div_profile, {
							"height": (((page.browser_w - 70) / 4) * 5) + "px",
						});
						u.ass(node.story, {
							"height": window.innerHeight + "px",
						});
					}
				}


				if(this.div_podcasts) {

					if(this.edge_podcast) {

						if(u.hc(this.div_podcasts, "collapsed")) {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
							});
						}
						else {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.last_podcasts) - u.absY(this.div_podcasts)) + (this.last_podcasts.offsetHeight) + 100 + "px"
							});
						}

					}

				}


				if(this.div_events) {
					u.ass(this.ul_events, {
						"height": (((page.browser_w - 50) / 4) * 5) + "px",
						"width": ((page.browser_w - 50) * this.events.length) + "px"
					});

					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];
						u.ass(node, {
							"width": (page.browser_w - 70) + "px",
						});
					}
				}


				// if(this.div_skillsuniverset) {
				// 	u.ass(this.div_skillsuniverset, {
				// 		"height": page.browser_h + "px",
				// 	});
				//
				// }

			}

		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready", this);

			// Add page loader
			this.loading = u.ae(page, "div", {
				"class":"loading"
			});

			// Query elements, preparation and collection of preload images
			var images = [];
			var i, node;


			// INTRO
			this.div_intro = u.qs("div.intro", this);
			if(this.div_intro) {
				images.push(u.assets["bg-intro"]);
			}

			this.div_statement = u.qs("div.statement", this);
			if(this.div_statement) {

				if(u.segment() === "desktop_guide" || u.segment() === "desktop") {
					images.push("/img/guide/desktop/txt_statement.png");
				}

			}


			// ROLEMODELS
			this.div_rolemodels = u.qs("div.rolemodels", this);
			if(this.div_rolemodels) {

				images.push(u.assets["bg-rolemodels"]);

				this.div_rolemodels.h2 = u.qs("h2", this.div_rolemodels);
				this.div_rolemodels.h2_offset = u.ae(this.div_rolemodels, "h2", {"class":"offset", "html":this.div_rolemodels.h2.innerHTML});

				this.rolemodels = u.qsa("li.rolemodel", this.div_rolemodels);
				if(this.rolemodels.length) {

					// images.push("/img/guide/smartphone/profiles/bn_play_2.png");
					// images.push("/img/guide/smartphone/profiles/bn_play_3.png");
					// images.push("/img/guide/smartphone/profiles/bn_play_4.png");

					for(i = 0; i < this.rolemodels.length; i++) {
						node = this.rolemodels[i];
						node.div = this;
						node.rolemodel = node.getAttribute("data-rolemodel");
						this["div_rolemodel_"+node.rolemodel] = node;

						node.thumb_src = node.getAttribute("data-thumb-src");
						node.poster_src = node.getAttribute("data-poster-src");
						node.video_src = node.getAttribute("data-video-src");


						node.div_profile = u.qs("div.profile", node);
						node.div_profile.node = node;
						node.div_image = u.qs("div.image", node);
						node.h3 = u.qs("h3", node);
						// node.h3_offset = u.ae(node.div_profile, "h3", {"class":"offset", "html":node.h3.innerHTML});

						node.div_shadow = u.ae(node.div_profile, "div", {"class":"shadow"});

						// node.p = u.qs("p", node);


						node.story = u.qs("div.story", node);
						node.story.node = node;
						node.story.div_image = u.qs("div.image", node.story);

						node.story.ul_chapters = u.qs("ul.chapters", node.story);
						node.story.links = node.story.ul_chapters.getAttribute("data-links-json");
						if(node.story.links) {
							node.story.links = JSON.parse(atob(node.story.links));
						}
						node.story.chapters = u.qsa("li.chapter", node.story);

						// node.profile = u.ae(node, "div", {"class":"profile"});
						// node.bn_play = u.ae(node, "div", {"class":"play", "id": "bn_play_rolemodel_"+node.rolemodel});
						// node.bn_play.node = node;

						images.push(node.thumb_src);
						images.push(node.poster_src);
						// images.push("/img/guide/smartphone/profiles/bg_"+node.rolemodel+".png");
						// images.push("/img/guide/smartphone/profiles/gx_path_"+node.rolemodel+".png");
						// images.push("/img/guide/smartphone/profiles/pi_"+node.rolemodel+".png");
						// images.push("/img/guide/smartphone/profiles/txt_"+node.rolemodel+".png");
						// images.push("/img/guide/smartphone/profiles/txt_name_"+node.rolemodel+".png");
					}
				}


			}


			// PODCASTS
			this.div_podcasts = u.qs("div.podcasts", this);
			if(this.div_podcasts) {

				this.div_podcasts.div = this;

				images.push(u.assets["bg-podcasts"]);
				// images.push(u.assets["hd-podcasts"]);

				images.push(u.assets["gx-link-0"]);
				images.push(u.assets["gx-link-1"]);
				images.push(u.assets["gx-link-2"]);
				images.push(u.assets["gx-link-3"]);
				images.push(u.assets["gx-frame"]);

				this.podcast_intro = u.qs("div.intro", this.div_podcasts);
				this.podcast_headline = u.qs("h2", this.div_podcasts);

				this.podcast_headline = u.qs("h2", this.div_podcasts);
				this.podcast_headline_offset = u.ae(this.div_podcasts, "h2", {"class":"offset", "html":this.podcast_headline.innerHTML});

				this.podcast_featured = u.qs("div.podcast.featured", this.div_podcasts);
				this.podcast_featured.h3 = u.qs("h3", this.podcast_featured);
				this.podcast_featured.h3.node = this.podcast_featured;

				this.podcast_featured.bn_play = u.qs("ul.actions a", this.podcast_featured);
				this.podcast_featured.bn_play.node = this.podcast_featured;
				this.podcast_featured.div_platforms = u.qs("div.platforms", this.podcast_featured);
				this.podcast_featured.platforms = u.qsa("li", this.podcast_featured.div_platforms);

				this.podcast_featured.div_image = u.qs("div.image", this.podcast_featured);
				this.podcast_featured.image_src = this.podcast_featured.div_image.getAttribute("data-image-src");

				this.podcast_featured.video_src = this.podcast_featured.div_image.getAttribute("data-video-src");

				images.push(this.podcast_featured.image_src);



				this.podcasts = u.qsa("li.podcast", this.div_podcasts);
				for(i = 0; i < this.podcasts.length; i++) {
					node = this.podcasts[i];
					node.h3 = u.qs("h3", node);

					node.bn_play = u.qs("ul.actions a", node);
					node.bn_play.node = node;
					node.div_platforms = u.qs("div.platforms", node);
					node.platforms = u.qsa("li", node.div_platforms);

					node.div_image = u.qs("div.image", node);

					node.image_src = node.div_image.getAttribute("data-image-src");

					images.push(node.image_src);
				}

				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_podcasts, [
						{"c1": [
							"h2",
							"h2.offset",
							"div.intro",
						]},
						{"c2": [
							"div.featured",
							"ul.podcasts"
						]}
					]);
				}

			}


			// EVENTS
			this.div_events = u.qs("div.events", this);
			if(this.div_events) {

				this.div_events.h2 = u.qs("h2", this.div_events);
				this.div_events.h2_offset = u.ae(this.div_events, "h2", {"class":"offset", "html":this.div_events.h2.innerHTML});

				images.push(u.assets["bg-events"]);

				this.ul_events = u.qs("ul.events", this.div_events);
				this.ul_events.div = this;

				this.events = u.qsa("li.event", this.div_events);
				if(this.events) {
					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];
						node.div = this;
						node.h3 = u.qs("h3", node);
						// node.h3.node = node;
						// node.h3.div = this;
						node.p = u.qs("p", node);
						node.dl_info_date = u.qs("dl.info.date", node);
						node.dl_info_time = u.qs("dl.info.time", node);
						node.bn_readmore = u.qs("li.readmore", node);
						node.div_image = u.qs("div.image", node);

						node.image_src = node.div_image.getAttribute("data-image-src");

						images.push(node.image_src);
					}

				}

			}


			// SKILLSUNIVERSET
			this.div_skillsuniverset = u.qs("div.skillsuniverset", this);
			if(this.div_skillsuniverset) {

				this.h2_skillsuniverset = u.qs("h2", this.div_skillsuniverset);
				this.h2_skillsuniverset.h2_offset = u.ae(this.div_skillsuniverset, "h2", {"class":"offset", "html":this.h2_skillsuniverset.innerHTML});

				this.p_skillsuniverset = u.qs("p", this.div_skillsuniverset);
				this.bn_skillsuniverset = u.qs("ul.actions li", this.div_skillsuniverset);

				this.bn_skillsuniverset.a = u.qs("a", this.bn_skillsuniverset);
				u.ce(this.bn_skillsuniverset.a, {"type":"link"});

				this.bn_skillsuniverset.a_offset = u.ae(this.bn_skillsuniverset.a, "span", {"class":"offset", "html":this.bn_skillsuniverset.a.innerHTML});

				images.push(u.assets["bg-skillsuniverset"]);
				images.push(u.assets["su-circle-1"]);
				images.push(u.assets["su-circle-2"]);
				images.push(u.assets["su-circle-3"]);
				images.push(u.assets["su-circle-4"]);

				// images.push(u.assets["su-block"]);
				// images.push(u.assets["su-bn"]);

				this.div_skillsuniverset.intro_images = [

					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216018.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216020.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216022.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216024.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216026.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216028.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216030.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216032.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216034.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216036.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216038.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216040.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216042.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216044.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216046.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216048.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216050.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216052.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216054.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216056.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216058.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216060.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216062.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216064.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216066.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216068.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216070.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216072.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216074.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216076.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216078.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216080.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216082.jpg",
				];

				for(i = 0; i < this.div_skillsuniverset.intro_images.length; i++) {
					images.push(this.div_skillsuniverset.intro_images[i]);
				}

				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_skillsuniverset, [
						{"c1": [
							"ul.actions",
							
						]},
						{"c2": [
							"h2",
							"h2.offset",
							"div.smartphone",
							"div.desktop"
						]}
					]);
				}

			}


			// INSTAGRAM
			this.div_instagram = u.qs("div.instagram", this);
			if(this.div_instagram) {

				this.div_instagram.h2 = u.qs("h2", this.div_instagram);
				this.div_instagram.h2_offset = u.ae(this.div_instagram, "h2", {"class":"offset", "html":this.div_instagram.h2.innerHTML});

				this.instagram_posts = u.qsa("li.post", this.div_instagram);
				if(this.instagram_posts.length) {
					for(i = 0; i < this.instagram_posts.length; i++) {
						images.push("/img/guide/smartphone/instagram/pi_instagram_"+i+".jpg");
					}
				}


				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_instagram, [
						{"c1": [
							"h2",
							"h2.offset",
							"ul.actions",
							
						]},
						{"c2": [
							"ul.instagram"
						]}
					]);
				}

			}


			// Create navigation
			if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
				this.ul_navigation = u.ae(page.nN, "ul", {"class":"navigation"});

				var li_nav_rolemodels = u.ae(this.ul_navigation, "li", {"class":"rolemodels", "html":"Stories"});
				u.ce(li_nav_rolemodels).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_rolemodels});
				}
				var li_nav_podcasts = u.ae(this.ul_navigation, "li", {"class":"podcasts", "html":"Podcasts"});
				u.ce(li_nav_podcasts).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_podcasts});
				}
				var li_nav_events = u.ae(this.ul_navigation, "li", {"class":"events", "html":"Events"});
				u.ce(li_nav_events).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_events});
				}
				var li_nav_skillsuniverset = u.ae(this.ul_navigation, "li", {"class":"skillsuniverset", "html":"Skillsuniverset"});
				u.ce(li_nav_skillsuniverset).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_skillsuniverset});
				}


			}


			page.resized();


			this.loaded = function() {
				// u.bug("loaded");

				this.loading.transitioned = function() {
					u.rc(page, "loading");

					page.removeChild(page.scene.loading);
					delete page.scene.loading;
				}
				u.ass(this.loading, {
					"transition":"all 0.3s ease-in-out",
					"opacity": 0,
				});

				this.build();
				page.scrolled();
			}
			// u.bug("images", images);

			u.preloader(this, images);

		}

		scene.build = function() {
			// u.bug("build");

			var i, node;


			// INTRO
			if(this.div_intro) {

				u.viewTracker(this.div_intro);
				this.div_intro.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("");

						if(!this.is_playing) {
							this.video_player.play();
							this.is_playing = true;
						}
					}
					else {
						this.video_player.pause();
						this.is_playing = false;
					}
				}

				u.ass(this.div_intro, {
					"background-image":"url("+u.assets["bg-intro"]+")",
				});

				this.div_intro.video_player = u.videoPlayer({muted:true, loop:true, playsinline:true});
				this.div_intro.video_player.ready = function() {
					u.ae(page.scene.div_intro, this);
					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						this.loadAndPlay("/img/guide/smartphone/intro/intro.mp4");
					}
					else {
						this.loadAndPlay("/img/guide/desktop/intro/intro.mp4");
					}
				}
			}


			// STATEMENT
			this.div_statement = u.qs("div.statement", this);
			if(this.div_statement) {

				if(u.segment() === "desktop_guide" || u.segment() === "desktop") {
					u.ae(this.div_statement, "img", {src: "/img/guide/desktop/txt_statement.png"});
				}

			}


			// ROLEMODELS
			if(this.div_rolemodels && this.rolemodels) {

				// u.viewTracker(this.div_rolemodels);
				// this.div_rolemodels.isVisible = function(position) {
				// 	if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
				// 		page.updateUrl("rolemodels");
				// 	}
				// }

				u.ass(this.div_rolemodels, {
					"background-image": "url("+u.assets["bg-rolemodels"]+")"
				});

				for(i = 0; i < this.rolemodels.length; i++) {
					node = this.rolemodels[i];
					// u.ass(node, {
					// 	"background-image":"url(/img/guide/smartphone/profiles/gx_path_"+node.rolemodel+".png), url(/img/guide/smartphone/profiles/bg_"+node.rolemodel+".png)",
					// });
					u.ass(node.div_profile, {
						"background-image":"url("+node.poster_src+")",
					});

					u.ass(node.div_image, {
						"background-image":"url("+node.thumb_src+")",
					});
					node.div_frame = u.ae(node.div_profile, "div", {"class":"frame"});
					u.ass(node.div_frame, {
						"background-image":"url("+u.assets["su-circle-"+(i+1)]+")",
					});

					node.video_player = u.videoPlayer({
						playsinline:true,
						preload: "metadata",
						muted: true,
						loop: true
					});
					node.video_player.node = node;
					u.ae(node.div_profile, node.video_player);

					node.video_player.load(node.video_src);

					// u.ass(node.p, {
					// 	"background-image":"url(/img/guide/smartphone/profiles/txt_"+node.rolemodel+".png)",
					// });

					// u.ass(node.h3, {
					// 	"background-image":"url(/img/guide/smartphone/profiles/txt_name_"+node.rolemodel+".png)",
					// });

					// node.bn_play_sequence_player = u.sequencePlayer(node.bn_play, {"loop":true, "framerate": 10});
					// node.bn_play_sequence_player.loaded = function() {
					// 	this.first();
					// }
					// node.bn_play_sequence_player.load([
					// 	u.assets["bn-play-1"],
					// 	u.assets["bn-play-2"],
					// 	u.assets["bn-play-3"],
					// 	u.assets["bn-play-4"],
					// ]);

					// node.frame_timestamp = 0;

					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						u.viewTracker(node);
						node.isVisible = function(position) {
							if(position.top < (page.browser_h / 2) && position.bottom < page.browser_h / 2) {
							// 	if(position.event.timeStamp - this.frame_timestamp > 60) {
							// 		this.bn_play_sequence_player.next();
							// 		this.frame_timestamp = position.event.timeStamp;
							// 	}
								if(!this.is_playing) {
									this.is_playing = true;
									this.video_player.play();
								}
							}
							else if(this.is_playing) {
								this.is_playing = false;
								this.video_player.pause();
							}

							if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
								page.updateUrl("rolemodels/"+this.rolemodel);
							}

						}
					}
					else {

						u.viewTracker(node);
						node.isVisible = function(position) {
							if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
								page.updateUrl("rolemodels");
							}

						}

						u.e.hover(node);
						node.over = function() {
							if(!this.is_playing) {
								this.is_playing = true;
								this.video_player.play();
							}
						}
						node.out = function() {
							if(this.is_playing) {
								this.is_playing = false;
								this.video_player.pause();
							}
						}
					}

					u.ass(node.story.div_image, {
						"background-image":"url("+node.thumb_src+")",
					});

					node.story.video_player = u.videoPlayer({
						preload: "metadata",
					});
					node.story.video_player.node = node;
					u.ae(node.story, node.story.video_player);

					node.story.video_player.ended = function() {
						var next_chapter = u.ns(this.node.current_chapter);
						if(next_chapter) {
							this.node.playStory(next_chapter);
						}
					}
					node.story.video_player.timeupdate = function(event) {

						u.ass(this.node.current_chapter.div_progress_bar, {
							"width": this.currentTime/this.duration * 100 + "%",
						});
					}


					node.playStory = function(chapter) {
						// u.bug("playStory", chapter);

						if(this.current_chapter) {
							u.rc(this.current_chapter, "playing");
							u.ass(this.current_chapter.div_progress_bar, {
								"width":"0",
							});
						}


						var i, li, found = false;
						for(i = 0; i < this.story.chapters.length; i++) {
							li = this.story.chapters[i];
							if(found) {
								u.rc(li, "played");
							}
							else if(li !== chapter) {
								u.ac(li, "played");
							}
							else {
								u.rc(li, "played");
								found = true;
								
							}

						}

						var link;

						for(i = 0; i < this.story.dynlinks.length; i++) {
							link = this.story.dynlinks[i];
							if(link.chapter == chapter) {
								u.ass(link, {
									"display":"block"
								});
							}
							else {
								u.ass(link, {
									"display":"none"
								});
							}
						}

						u.ac(chapter, "playing");

						page.updateUrl("rolemodels/"+this.rolemodel+"/"+chapter.index);

						this.story.video_player.loadAndPlay(chapter.video_src);
						// this.story.video_player.load(chapter.video_src);

						this.current_chapter = chapter

					}


					node.story.bn_close = u.ae(node.story, "div", {"class":"close"});
					node.story.bn_close.node = node;
					u.ce(node.story.bn_close);
					node.story.bn_close.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_close.clicked = function(){
						this.node.closeStory();
					}

					node.story.bn_mute = u.ae(node.story, "div", {"class":"mute"});
					node.story.bn_mute.node = node;
					u.ce(node.story.bn_mute);
					node.story.bn_mute.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_mute.clicked = function(){

						if(this.node.story.video_player._muted) {
							u.rc(this, "selected");
							this.node.story.video_player.unmute();
							this.node.story.video_player._muted = false;
						}
						else {
							u.ac(this, "selected");
							this.node.story.video_player.mute();
							this.node.story.video_player._muted = true;
						}

					}

					node.story.bn_share = u.ae(node.story, "div", {"class":"share"});
					node.story.bn_share.node = node;
					u.ce(node.story.bn_share);
					node.story.bn_share.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_share.clicked = function(event){

						window.share_data = {
						  title: this.node.rolemodel + ", Rollemodel",
						  text: "Skillsguiden",
						  url: location.href
						}
						window.share_node = this;

						if(navigator.canShare) {
							navigator.share(window.share_data).then(function() {}, function() {});
						}
						else {
							navigator.clipboard.writeText(window.share_data.url).then(function() {
								window.linkCopied();
							}, function(err) {
								window.linkCopyFailed();
							});
						}

					}
					window.linkCopied = function() {
						var copied = u.ae(window.share_node, "div", {"class": "copied", "html": "Linket er kopieret"});
						u.t.setTimer(copied, function() {u.ass(this, {transition: "all 0.5s ease-in-out", "opacity": 0})}, 1500);
					}
					window.linkCopyFailed = function() {
						var copied = u.ae(window.share_node, "div", {"class": "copied", "html": "Deling er ikke understøttet i din browser"});
						u.t.setTimer(copied, function() {u.ass(this, {transition: "all 0.5s ease-in-out", "opacity": 0})}, 1500);
					}

					u.e.click(node.story);
					node.story.clicked = function(event) {
						u.t.resetTimer(this.t_hold);
						if(this.hold_to_pause) {
							this.node.story.video_player.play();
							this.hold_to_pause = false;
						}
						else {
							var event_x = u.eventX(event);
							if(event_x < this.offsetWidth / 2) {
								this.swipedRight();
							}
							else {
								this.swipedLeft();
							}
						}
					}

					node.story.inputStarted = function(event) {
						this.t_hold = u.t.setTimer(this, function(){this.hold_to_pause = true; this.node.story.video_player.pause()}, 200);
					}


					u.e.swipe(node.story, node.story);
					node.story.swipedLeft = function() {
						var next_chapter = u.ns(this.node.current_chapter);
						if(next_chapter) {
							this.node.playStory(next_chapter);
						}
					}
					node.story.swipedRight = function() {
						var prev_chapter = u.ps(this.node.current_chapter);
						if(prev_chapter) {
							this.node.playStory(prev_chapter);
						}
					}

					node.story.swipedUp = node.story.swipedDown = function() {
						this.node.closeStory();
					}

					node.closeStory = function() {
						this.story.transitioned = function() {
							u.ass(this, {
								"display":"none"
							});
						}
						this.story.video_player.stop();

						page.updateUrl("rolemodels/"+this.rolemodel);

						u.ass(this.story, {
							"transition":"all 0.2s ease-in-out",
							"opacity": 0
						});
						
						u.ass(document.body, {
							"overflow":"visible"
						});
					}

					node.openStory = function(chapter) {

						chapter = chapter || this.story.chapters[0];

						u.ass(document.body, {
							"overflow":"hidden"
						});

						u.ass(this.story, {
							opacity: 0,
							display: "block",
							height: window.innerHeight+"px",
						});

						u.ass(this.story, {
							transition: "all 0.4s ease-in-out",
							opacity: 1,
						});

						// Start playing first video in story
						this.playStory(chapter);

					}

					var j, li;

					for(j = 0; j < node.story.chapters.length; j++) {
						li = node.story.chapters[j];
						li.node = node;
						li.index = j+1;
						li.video_src = li.getAttribute("data-video-src");

						li.div_bar = u.ae(li, "div", {"class":"bar"});
						li.div_progress_bar = u.ae(li.div_bar, "div", {"class":"progress_bar"});

						if(node.story.links && node.story.links[j]) {
							li.links = [];

							var k, link, dynlink, links = node.story.links[j];
							for(k = 0; k < links.length; k++) {
								link = links[k];
								dynlink = u.ae(node.story.video_player, "a", {
									"class": "dynlink", 
									"html": link.text, 
									"href": link.href,
									"id": "story_link_"+node.rolemodel+"_"+u.superNormalize(link.text),
								});
								u.ass(dynlink, {
									"top": (link.y ? link.y : "20%"),
									"left": (link.x ? link.x : "20%"),
									"max_width": (link.max_width ? "max-width:"+link.max_width : "auto"),
									"color": (link.color ? link.color : "#283583"),
									"background-color": (link.background ? link.background : "#ffffff")
								});
								dynlink.chapter = li;
								u.ce(dynlink);
								dynlink.clicked = function(event) {
									u.e.kill(event);
									location.href = this.url;
								}
							} 
						}


						u.ce(li);
						li.inputStarted = function(event) {
							u.e.kill(event);
						}
						li.clicked = function() {
							this.node.playStory(this);
						}
					}

					// Get all dynamically added links
					node.story.dynlinks = u.qsa("a.dynlink", node.story.video_player);

					node.story.ul_profiles = u.ae(node.story, "ul", {"class":"profiles"});
					for(j = 0; j < this.rolemodels.length; j++) {
						li = u.ae(node.story.ul_profiles, "li", {"class":"profile"});
						li.node = node;
						li.rolemodel = this.rolemodels[j];

						li.div_image = u.ae(li, "div", {"class":"image"});
						u.ass(li.div_image, {
							"background-image":"url("+this.rolemodels[j].thumb_src+")",
						});


						if(node.rolemodel === li.rolemodel.rolemodel) {
							u.ac(li, "selected");
						}
						else {

							li.div_frame = u.ae(li, "div", {"class":"frame"});
							u.ass(li.div_frame, {
								"background-image":"url("+u.assets["su-circle-"+(j+1)]+")",
							});

							u.ce(li);
							li.clicked = function() {
								this.node.closeStory()
								this.rolemodel.openStory();
								u.bug("change profile", this.rolemodel.rolemodel)
							}

						}

					}

					u.e.click(node.div_profile);
					node.div_profile.clicked = function() {

						this.node.openStory();
					}
				}

			}


			// PODCASTS
			if(this.div_podcasts) {

				u.viewTracker(this.div_podcasts);
				this.div_podcasts.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("podcasts");
					}
				}

				u.ass(this.div_podcasts, {
					"background-image": "url("+u.assets["bg-podcasts"]+")",
				});
				// u.ass(this.podcast_headline, {
				// 	"background-image": "url("+u.assets["hd-podcasts"]+")",
				// });

				u.ass(this.podcast_featured.h3, {
					"background-image": "url("+u.assets["gx-link-0"]+")",
				});

				u.ass(this.podcast_featured.div_image, {
					"background-image": "url("+this.podcast_featured.image_src+")",
				});

				u.ce(this.podcast_featured.h3);
				this.podcast_featured.h3.clicked = function() {
					this.node.bn_play.clicked();
				}
				u.ce(this.podcast_featured.bn_play);
				this.podcast_featured.bn_play.clicked = function() {
					u.ac(this.node.div_platforms, "open");
					u.ass(this.node.div_platforms, {
						"height": window.innerHeight+"px",
					});
					u.ass(document.body, {
						"overflow":"hidden",
					});
				}
				u.ce(this.podcast_featured.div_platforms);
				this.podcast_featured.div_platforms.clicked = function() {
					u.rc(this, "open");
					u.ass(document.body, {
						"overflow":"visible",
					});
				}
				for(i = 0; i < this.podcast_featured.platforms.length; i++) {
					u.ce(this.podcast_featured.platforms[i], {"type":"link"});
				}


				this.podcast_featured.bn_play_sequence_player = u.sequencePlayer(this.podcast_featured.bn_play, {"loop":true, "framerate": 10});
				this.podcast_featured.bn_play_sequence_player.loaded = function() {
					this.first();
				}
				this.podcast_featured.bn_play_sequence_player.load([
					u.assets["bn-play-1"],
					u.assets["bn-play-2"],
					u.assets["bn-play-3"],
					u.assets["bn-play-4"],
				]);
				//
				// this.podcast_featured.frame_timestamp = 0;
				//
				u.viewTracker(this.podcast_featured);
				this.podcast_featured.isVisible = function(position) {
					if(position.top > 0 && position.bottom > 0) {

						if(!this.is_playing) {
							this.video_player.play();
							this.is_playing = true;
						}

				// 		if(position.event.timeStamp - this.frame_timestamp > 60) {
				// 			this.bn_play_sequence_player.next();
				// 			this.frame_timestamp = position.event.timeStamp;
				// 		}
				
					}
					else {
						this.video_player.pause();
						this.is_playing = false;
					}
				}

				this.podcast_featured.video_player = u.videoPlayer({muted:true, loop:true, playsinline:true});
				this.podcast_featured.video_player.node = this.podcast_featured;
				this.podcast_featured.video_player.ready = function() {
					u.ae(this.node.div_image, this);
					this.load(this.node.video_src);
				}

				this.podcast_featured.bn_mute = u.ae(this.podcast_featured.div_image, "div", {"class":"mute selected"});
				this.podcast_featured.bn_mute.node = this.podcast_featured;
				u.ce(this.podcast_featured.bn_mute);
				this.podcast_featured.bn_mute.clicked = function(){

					if(this.node.video_player._muted) {
						u.rc(this, "selected");
						this.node.video_player.unmute();
						this.node.video_player._muted = false;
					}
					else {
						u.ac(this, "selected");
						this.node.video_player.mute();
						this.node.video_player._muted = true;
					}

				}

				if(this.podcasts) {
					for(i = 0; i < this.podcasts.length; i++) {
						node = this.podcasts[i];
						u.ass(node, {
							"background-image": "url("+u.assets["gx-link-"+(((i+1)%3) ? ((i+1)%3) : 3)]+")",
						});

						node.div_frame = u.ae(node, "div", {"class":"frame"});
						u.ass(node.div_frame, {
							"background-image": "url("+u.assets["gx-frame"]+")",
						});

						u.ass(node.div_image, {
							"background-image": "url("+node.image_src+")",
						});

						u.ce(node);
						node.clicked = function() {
							u.ac(this.div_platforms, "open");
							u.ass(this.div_platforms, {
								"height": window.innerHeight+"px",
							});
							u.ass(document.body, {
								"overflow":"hidden",
							});
						}

						u.ce(node.div_platforms);
						node.div_platforms.clicked = function() {
							u.rc(this, "open");
							u.ass(document.body, {
								"overflow":"visible",
							});
						}
						var j;
						for(j = 0; j < node.platforms.length; j++) {
							u.ce(node.platforms[j], {"type":"link"});
						}

						node.bn_play_sequence_player = u.sequencePlayer(node.bn_play, {"loop":true, "framerate": 10});
						node.bn_play_sequence_player.node = node;
						node.bn_play_sequence_player.loaded = function() {
							this.first();
						//
						// 	u.viewTracker(this.node);
						// 	this.node.isVisible = function(position) {
						// 		if(position.top > (page.browser_h * 0.3) && position.top < page.browser_h * 0.6) {
						// 			if(position.event.timeStamp - this.frame_timestamp > 60) {
						// 				this.bn_play_sequence_player.next();
						// 				this.frame_timestamp = position.event.timeStamp;
						// 			}
						// 		}
						// 	}
						//
						}
						node.bn_play_sequence_player.load([
							u.assets["bn-play-1"],
							u.assets["bn-play-2"],
							u.assets["bn-play-3"],
							u.assets["bn-play-4"],
						]);
						//
						// node.frame_timestamp = 0;


					}

					if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
						var edge_count = 2;
					}
					else {
						var edge_count = 3;
					}

					// Collapse podcast list if more than 2 podcasts (also one exists as featured)
					if(this.podcasts.length > edge_count) {

						this.edge_podcast = this.podcasts[edge_count-1];
						this.last_podcasts = this.podcasts[this.podcasts.length-1];

						u.ac(this.div_podcasts, "collapsed");
						u.ass(this.div_podcasts, {
							"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
						});


						this.div_podcasts.bn_expand = u.ae(this.div_podcasts, "div", {"class":"expand"});
						this.div_podcasts.bn_expand.icon = u.ae(this.div_podcasts.bn_expand, "div", {"class":"icon"});
						this.div_podcasts.bn_expand.div = this;
						u.ce(this.div_podcasts.bn_expand);
						this.div_podcasts.bn_expand.clicked = function(event) {
							if(u.hc(this.div.div_podcasts, "collapsed")) {
								// this.div.div_podcasts.transitioned = function() {
								// 	// u.ass(this.div.div_podcasts, {
								// 	// 	"height": "auto"
								// 	// });
								// }
								u.ass(this.div.div_podcasts, {
									"transition": "all 0.4s ease-in-out",
									"height": (u.absY(this.div.last_podcasts) - u.absY(this.div.div_podcasts)) + (this.div.last_podcasts.offsetHeight) + 100 + "px"
								});
								u.rc(this.div.div_podcasts, "collapsed");
							}
							else {
								
								u.ass(this.div.div_podcasts, {
									"transition": "all 0.4s ease-in-out",
									"height": (u.absY(this.div.edge_podcast) - u.absY(this.div.div_podcasts)) + (this.div.edge_podcast.offsetHeight / 2) + "px"
								});

								u.ac(this.div.div_podcasts, "collapsed");
							}
						}

					}


				}
				
			}


			// EVENTS
			if(this.div_events) {

				u.viewTracker(this.div_events);
				this.div_events.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("events");
					}
				}

				u.ass(this.div_events, {
					"background-image": "url("+u.assets["bg-events"]+")"
				});

				if(this.events) {
					// this.events.changeEvent = function(li) {
					//
					//
					// 	if(this.current_event) {
					//
					// 		this.next_event = li;
					//
					// 		this.current_event._transitioned = function() {
					// 			u.ass(this, {
					// 				"height": "auto"
					// 			});
					// 		}
					// 		u.ass(this.current_event, {
					// 			// "transition": "all 0.2s ease-in-out",
					// 			"transition": "none",
					// 			"height": this.current_event.pre_height,
					// 		});
					//
					// 		this.current_event.h3._transitioned = function() {
					// 			u.ass(this, {
					// 				transition: "none",
					// 				"position":"static",
					// 				"height": "auto"
					// 			});
					//
					// 			this.div.events.showEvent(this.div.events.next_event);
					// 			delete this.div.events.next_event;
					// 		}
					// 		u.ass(this.current_event.h3, {
					// 			// transition: "all 0.2s ease-in-out",
					// 			"transition": "none",
					// 			"transform": "rotate(0)",
					// 			"top": 0,
					// 			"left": 0,
					// 			"width": this.current_event.pre_width,
					// 			"height": this.current_event.pre_height,
					// 			"padding": "15px 10%",
					// 			"font-size":"30px",
					// 			"line-height":"27px",
					// 		});
					//
					// 		u.ass(this.current_event.p, {
					// 			transition: "none",
					// 			display: "none",
					// 			opacity: 0,
					// 		});
					//
					// 		u.ass(this.current_event.dl_info, {
					// 			transition: "none",
					// 			display: "none",
					// 			opacity: 0,
					// 		});
					//
					// 		u.ass(this.current_event.div_image, {
					// 			transition: "none",
					// 			display: "none",
					// 			opacity: 0,
					// 		});
					// 		u.ass(this.current_event.div_frame, {
					// 			transition: "none",
					// 			display: "none",
					// 			opacity: 0,
					// 		});
					//
					// 		u.ass(this.current_event.bn_readmore, {
					// 			transition: "none",
					// 			display: "none",
					// 			opacity: 0,
					// 		});
					//
					// 		this.current_event._transitioned();
					// 		this.current_event.h3._transitioned();
					//
					// 	}
					// 	else {
					// 		this.showEvent(li);
					// 	}
					//
					// }
					//
					// this.events.showEvent = function(li, open_on_load) {
					//
					// 	// Skip transitions on page load opening
					//
					// 	li.pre_height = u.gcs(li, "height");
					// 	li.pre_width = u.gcs(li, "width");
					//
					// 	// u.bug("li.pre_height", li.pre_height);
					//
					// 	u.ass(li, {
					// 		transition: "none",
					// 		height: li.pre_height,
					// 	});
					//
					// 	// calculate rotation offset
					// 	var offset_x = (page.browser_w - this.event_height) / 2;
					// 	var offset_y = (this.event_height - page.browser_w) / 2;
					// 	u.ass(li.h3, {
					// 		transition: "none",
					// 		"position":"absolute",
					// 		"transform": "rotate(0)",
					// 		"top": "0px",
					// 		"left": "0px",
					// 		"width": li.pre_width,
					// 		"height": li.pre_height,
					// 		"padding": "15px 10%;",
					// 		"font-size":"30px",
					// 		"line-height":"27px",
					// 	});
					//
					// 	u.ass(li.h3, {
					// 		transition: (open_on_load ? "none" : "all 0.4s ease-in-out"),
					// 		"position":"absolute",
					// 		"transform": "rotate(-90deg)",
					// 		"top": offset_y+"px",
					// 		"left": offset_x+"px",
					// 		"width": this.event_height+"px",
					// 		"height": page.browser_w+"px",
					// 		"padding": (page.browser_w * 0.65) + "px 5% 0",
					// 		"font-size":"60px",
					// 		"line-height":"52px",
					// 	});
					//
					//
					// 	li.h3.transitioned = function() {
					// 		u.ass(this.node.div_image, {
					// 			display: "block",
					// 			transition: "all 0.4s ease-in-out",
					// 			opacity: 1,
					// 		});
					// 		u.ass(this.node.div_frame, {
					// 			display: "block",
					// 			transition: "all 0.4s ease-in-out 0.1s",
					// 			opacity: 1,
					// 		});
					//
					// 		u.ass(this.node.p, {
					// 			display: "block",
					// 			transition: "all 0.4s ease-in-out 0.2s",
					// 			opacity: 1,
					// 		});
					//
					// 		u.ass(this.node.dl_info, {
					// 			display: "block",
					// 			transition: "all 0.4s ease-in-out 0.3s",
					// 			opacity: 1,
					// 		});
					//
					// 		u.ass(this.node.bn_readmore, {
					// 			display: "block",
					// 			transition: "all 0.4s ease-in-out 0.4s",
					// 			opacity: 1,
					// 		});
					//
					//
					// 	}
					//
					// 	u.ass(li.div_image, {
					// 		display: "block",
					// 	});
					// 	u.ass(li.p, {
					// 		display: "block",
					// 	});
					// 	u.ass(li.dl_info, {
					// 		display: "block",
					// 	});
					// 	u.ass(li.bn_readmore, {
					// 		display: "block",
					// 	});
					//
					// 	// this.event_height
					// 	var height = li.div_image.offsetHeight + li.p.offsetHeight + li.dl_info.offsetHeight + li.bn_readmore.offsetHeight + 20 + 50;
					// 	u.bug(li.div_image.offsetHeight, li.p.offsetHeight, li.dl_info.offsetHeight, li.bn_readmore.offsetHeight);
					// 	u.ass(li, {
					// 		transition: (open_on_load ? "none" : "all 0.4s ease-in-out"),
					// 		height: height+"px",
					// 	});
					//
					// 	if(!open_on_load) {
					// 		u.scrollTo(window, {node:li});
					// 	}
					// 	else {
					// 		li.h3.transitioned();
					// 	}
					//
					// 	this.current_event = li;
					// }

					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						this.ul_events.current_event = 0;
						u.e.swipe(this.ul_events, this.ul_events, {"horizontal_lock":true});

						this.ul_events.inputStarted = function(event) {
							u.e.kill(event);
							u.t.resetTimer(this.t_auto_rotation);
						}

						this.ul_events.moved = function(event) {
							u.ass(this, {
								"transform": "translate("+(this.current_x -((page.browser_w - 50) * this.current_event)) +"px, 0)"
							});
						}

						// Next
						this.ul_events.swipedLeft = function() {
							// Go back to start
							if(this.current_event + 1 >= this.div.events.length) {
								this.current_event = 0;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
							// Show next
							else {
								this.current_event++;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
						}

						// Previous
						this.ul_events.swipedRight = function() {
							// Go back to start
							if(this.current_event - 1 < 0) {
								this.current_event = this.div.events.length-1;
								u.ass(this, {
									"transition":"all 0.3s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
							// Show next
							else {
								this.current_event--;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
						}

						this.ul_events.auto_rotation = function() {
							u.t.resetTimer(this.t_auto_rotation);
							this.t_auto_rotation = u.t.setTimer(this, function() {this.swipedLeft(); this.auto_rotation()}, 4000);
						}
						u.e.addEndEvent(this.ul_events, this.ul_events.auto_rotation);
						this.ul_events.auto_rotation();
					}

					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];

						if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
							u.ce(node.bn_readmore, {"type":"link"});
						}

						// node.div_frame = u.ae(node, "div", {"class":"frame"});
						// node.div_frame.gx_frame_sequence_player = u.sequencePlayer(node.div_frame, {"loop":true, "framerate": 10, "class":"frame"});
						// node.div_frame.gx_frame_sequence_player.loaded = function() {
						// 	this.first();
						//
						// 	u.viewTracker(this.node);
						// 	this.node.isVisible = function(position) {
						// 		if(position.top > -(page.browser_h * 0.3) && position.top < page.browser_h * 0.9) {
						// 			if(position.event.timeStamp - this.frame_timestamp > 60) {
						// 				this.gx_frame_sequence_player.next();
						// 				this.frame_timestamp = position.event.timeStamp;
						// 			}
						// 		}
						//
						// 	}
						//
						// }
						// node.div_frame.gx_frame_sequence_player.load([
						// 	u.assets["su-circle-1"],
						// 	u.assets["su-circle-2"],
						// 	u.assets["su-circle-3"],
						// 	u.assets["su-circle-4"],
						// ]);
						// node.div_frame.frame_timestamp = 0;


						u.ass(node.div_image, {
							"background-image": "url("+node.image_src+")",
						});

						u.ae(node.div_image, "div", {"class":"coloroverlay"});
						// u.ce(node.h3);
						// node.h3.clicked = function() {
						// 	if(this.div.events.current_event != this.node) {
						// 		this.div.events.changeEvent(this.node);
						// 	}
						// }
					}



					// this.events.showEvent(this.events[0], true);

				}
			}


			// SKILLSUNIVERSET
			if(this.div_skillsuniverset) {

				u.viewTracker(this.div_skillsuniverset);
				this.div_skillsuniverset.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("skillsuniverset");
					}
				}


				u.ass(this.div_skillsuniverset, {
					"background-image": "url("+u.assets["bg-skillsuniverset"]+")"
				});


				u.ce(this.bn_skillsuniverset);
				// u.ass(this.bn_skillsuniverset._a, {
				// 	"background-image": "url("+u.assets["su-bn"]+")"
				// });

				this.bn_skillsuniverset.gx_frame_sequence_player = u.sequencePlayer(this.bn_skillsuniverset, {"loop":true, "framerate": 10, "class":"frame"});
				this.bn_skillsuniverset.gx_frame_sequence_player.loaded = function() {
					this.first();
				}
				this.bn_skillsuniverset.gx_frame_sequence_player.load([
					// u.assets["su-circle-1"],
					u.assets["su-circle-2"],
					// u.assets["su-circle-3"],
					// u.assets["su-circle-4"],
				]);

				this.bn_skillsuniverset.room_sequence_player = u.sequencePlayer(this.bn_skillsuniverset, {"loop":true, "framerate": 10, "class":"room"});
				this.bn_skillsuniverset.room_sequence_player.node = this.bn_skillsuniverset;
				this.bn_skillsuniverset.room_sequence_player.loaded = function() {
					this.first();

					u.viewTracker(this.node);
					this.node.isVisible = function(position) {

						// if(position.top > -(page.browser_h * 0.3) && position.top < page.browser_h * 0.9) {
						// 	if(position.event.timeStamp - this.frame_timestamp > 60) {
						// 		this.gx_frame_sequence_player.next();
						// 		this.frame_timestamp = position.event.timeStamp;
						// 	}
						// }

						if(position.top > this.scroll_end && position.top < this.scroll_start) {
							i = Math.floor(((-(this.scroll_start) + (position.top)) / this.scroll_per_image));
							if(i != this.frame_index) {
								this.room_sequence_player.frame(i);
								this.frame_index = i;
							}
						}

					}
				}
				this.bn_skillsuniverset.room_sequence_player.load(this.div_skillsuniverset.intro_images);

				this.bn_skillsuniverset.scroll_start = page.browser_h - 100;
				this.bn_skillsuniverset.scroll_end = (page.browser_h / 2) - (this.bn_skillsuniverset.offsetHeight / 2);
				this.bn_skillsuniverset.scroll_per_image = (-this.bn_skillsuniverset.scroll_start + this.bn_skillsuniverset.scroll_end) / this.div_skillsuniverset.intro_images.length;

				this.bn_skillsuniverset.frame_timestamp = 0;
				this.bn_skillsuniverset.frame_index = 0;



				if(u.segment() === "smartphone_guide" || u.segment() === "smartphone") {
					u.ass(this.p_skillsuniverset, {
						"background-image": "url("+u.assets["su-block"]+")"
					});
				}
			}


			// INSTAGRAM
			if(this.div_instagram) {

				u.viewTracker(this.div_instagram);
				this.div_instagram.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("instagram");
					}
				}

				u.ass(this.div_instagram, {
					"background-image": "url("+u.assets["bg-events"]+")"
				});

				if(this.instagram_posts) {
					for(i = 0; i < this.instagram_posts.length; i++) {
						node = this.instagram_posts[i];
						u.ce(node, {type:"link"});
						u.ae(node._a, "img", {
							"src":"/img/guide/smartphone/instagram/pi_instagram_"+i+".jpg",
						});
					}
				}
			}


			// Scroll to selected section if any
			var current_section_url = u.h.getCleanUrl(location.href);
			if(current_section_url.replace(/^\/index\//, "").match(/^(podcasts|events|skillsuniverset|instagram|rolemodels)$/)) {
				u.bug("test", this["div_"+current_section_url.replace(/^\/index\//, "")].offsetTop);

				u.t.setTimer(this["div_"+current_section_url.replace(/^\/index\//, "")], function() {
					u.scrollTo(window, {"node":this});
				}, 500);

				// u.scrollTo(window, {"node":this["div_"+current_section_url.replace(/^\/index\//, "")]});
			}
			else if(current_section_url.replace(/^\/index\//, "").match(/^(rolemodels\/[a-z]+)/)) {
				var fragments = current_section_url.split("/");

				var rolemodel_node = this["div_rolemodel_"+fragments[3]];
				u.t.setTimer(rolemodel_node, function() {
					u.scrollTo(window, {"node":this});
				}, 500);

				// u.scrollTo(window, {"node":rolemodel_node});
				if(fragments.length > 4) {
					rolemodel_node.story.bn_mute.clicked();
					rolemodel_node.openStory(rolemodel_node.story.chapters[(Number(fragments[4])-1)], true);
				}
			}

		}

		// scene is ready
		scene.ready();
	}
}
