package me.letsorder;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.parse.ParseBroadcastReceiver;
//import com.parse.ParsePushBroadcastReceiver;

import me.letsorder.core.Config;

public class PushReceiver extends ParseBroadcastReceiver {
	
	@Override
	public void onReceive(Context context, Intent intent) {
		Log.d("onReceive", intent.toString());
		super.onReceive(context, intent);
	}
	
//    @Override
//    public void onPushOpen(Context context, Intent intent) {
//        Intent i = new Intent(context, MainActivity.class);
//        i.putExtras(intent.getExtras());
//        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        JSONObject alert;
//		try {
//			alert = new JSONObject(intent.getStringExtra(KEY_PUSH_DATA));
//			i.putExtra(Config.ORDER_PATH, alert.getString("path"));
//			Log.d("shush", "added to path: " + alert.getString("path"));
//		} catch (JSONException e) {
//			e.printStackTrace();
//		}
//        
//        context.startActivity(i);
//    }
}