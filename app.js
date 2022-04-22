/*
 * CookieConsent v2 DEMO config.
*/

// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
	autorun : true, 
	delay : 0,
	current_lang : 'en',
	auto_language : false,
	cookie_domain : 'misyst.com',
	autoclear_cookies : true,
	cookie_expiration : 365,
	theme_css: 'cookieconsent.css',
	force_consent: false,
	page_scripts: true,

	onAccept: function(cookie){
		console.log("onAccept fired ...");

		if(cc.allowedCategory('buttons')){
			ElementVisibility('buttons', true);
		}
		
		if(cc.allowedCategory('analytics')){
			cc.loadScript('https://www.google-analytics.com/analytics.js', function(){		
				ga('create', 'UA-82275304-1', 'auto');
				ga('send', 'pageview');
				console.log("analytics.js loaded");
			});
		}

		// delete line below
		typeof doDemoThings === 'function' && doDemoThings(cookie);
	},

	onChange: function(cookie){
		console.log("onChange fired ...");

		if(!cc.allowedCategory('buttons')){
			ElementVisibility('buttons', false);
		} else {
			ElementVisibility('buttons', true);
		}
		
		// delete line below
		typeof doDemoThings === 'function' && doDemoThings(cookie);
	},

	gui_options: {
        consent_modal : {
            layout : 'box',               // box/cloud/bar
            position : 'bottom center',     // bottom/top + left/right/center
            transition: 'zoom'             // zoom/slide
        },
        settings_modal : {
            layout : 'box',                 // box/bar
            // position : 'left',           // left/right
            transition: 'slide'             // zoom/slide
        }
    },

	languages : {
		'en' : {	
			consent_modal : {
				title :  "Use of cookies",
				description :  'By using this website you agree to make use of essential cookies to ensure its proper operation and tracking cookies after consent to understand how to interact. <button type="button" data-cc="c-settings" class="cc-link">Adjust settings</button>',
				primary_btn: {
					text: 'Accept',
					role: 'accept_selected'				//'accept_selected' or 'accept_all'
				},
				secondary_btn: {
					text : 'Reject',
					role : 'accept_necessary'				//'settings' or 'accept_necessary'
				}
			},
			settings_modal : {
				title : '<div>Cookie settings</div><div aria-hidden="true" style="font-size: .8em; font-weight: 200; color: #687278; margin-top: 5px;">Powered by <a tabindex="-1" aria-hidden="true" href="https://www.misyst.com/" style="text-decoration: underline;">contributors</a></div>',
				save_settings_btn : "Save settings",
				accept_all_btn : "Accept all",
				close_btn_label: "Close",
				cookie_table_headers : [
					{col1: "Name" }, 
					{col2: "Domain" }, 
					{col3: "Expiration" }, 
					{col4: "Description" }, 
					{col5: "Type" }
				],
				blocks : [
					{
						title : "Cookie usage",
						description: 'This website use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="https://www.misyst.com/privacy.html" class="cc-link" target="_blank">Privacy Policy</a>.'
					},{
						title : "Strictly necessary cookies",
						description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
						toggle : {
							value : 'necessary',
							enabled : true,
							readonly: true							//cookie categories with readonly=true are all treated as "necessary cookies"
						},
						cookie_table: [
							{
								col1: 'cc_cookie',
								col2: 'misyst.com',
								col3: '1 year',
								col4: 'Preference choices' ,
								col5: 'Persistent cookie'
							}
						]
					},{
						title : "Preferences cookies",
						description: 'These cookies allow the website to remember the choices you have made in the past',
						toggle : {
							value : 'preferences',	//there are no default categories => you specify them
							enabled : true,
							readonly: false
						}
					},{
						title : "Analytics cookies",
						description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of these data is been storage anonymized and may be used to improve functionality',
						toggle : {
							value : 'analytics',
							enabled : true,
							readonly: false
						},
						cookie_table: [
							{
								col1: '_gat',
								col2: 'google.com',
								col3: '1 minute',
								col4: 'Requests identity' ,
								col5: 'Temporary cookie'
							},
							{
								col1: '_gid',
								col2: 'google.com',
								col3: '1 day',
								col4: 'Analytics identity' ,
								col5: 'Temporary cookie'
							},
							{
								col1: '_ga',
								col2: 'google.com',
								col3: '2 years',
								col4: 'User identity' ,
								col5: 'Persistent cookie'
							}
						]
					},{
						title : "Buttons cookies",
						description: 'These cookies collect information about how functionality has to be served. All of these data is been storage anonymized and may be used to improve functionality. * Additional cookies may be placed of cookie settings by the use of the services',
						toggle : {
							value : 'buttons',
							enabled : true,
							readonly: false
						},
						cookie_table: [
							{
								col1: 'locale',
								col2: 'facebook.com *',
								col3: '7 days',
								col4: 'Language/country' ,
								col5: 'Temporary cookie'
							},
							{
								col1: 'datr',
								col2: 'facebook.com *',
								col3: '2 years',
								col4: 'Browser identity' ,
								col5: 'Persistent cookie'
							},
							{
								col1: 'guest_id',
								col2: 'twitter.com *',
								col3: '2 years',
								col4: 'Guest identity' ,
								col5: 'Persistent cookie'
							},
							{
								col1: 'personalization_id',
								col2: 'twitter.com *',
								col3: '2 years',
								col4: 'Personalization identity' ,
								col5: 'Persistent cookie'
							},
							{
								col1: 'ads_prefs',
								col2: 'twitter.com *',
								col3: '5 years',
								col4: '<a class="cc-link" href="https://twitter.com/settings/account/personalization" target="_blank">Personalization</a>' ,
								col5: 'Settings'
							}
						]
					},{
						title : "More information",
						description: 'For any queries in relation to the policy on cookies and your choices, please <a class="cc-link" href="https://www.misyst.com/">visit Misyst</a>.',
					}
				]
			}
		}
	}
});