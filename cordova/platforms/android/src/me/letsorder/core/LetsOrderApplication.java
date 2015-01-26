package me.letsorder.core;

import android.app.Application;

import com.parse.Parse;
import com.parse.ParseInstallation;

public class LetsOrderApplication extends Application {

	@Override
	public void onCreate() {
		super.onCreate();
		Parse.initialize(this, Common.PARSE_APP_KEY, Common.PARSE_APP_SECRET);
        ParseInstallation.getCurrentInstallation().saveInBackground();
	}
	
}
