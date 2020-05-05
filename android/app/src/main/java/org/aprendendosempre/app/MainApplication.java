package org.aprendendosempre.app;

import com.datami.smi.SdStateChangeListener; 
import com.datami.smi.SmiResult; 
import com.datami.smi.SmiSdk; 
import com.datami.smisdk_plugin.SmiSdkReactModule; 
import com.datami.smisdk_plugin.SmiSdkReactPackage; 
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.rnscreens.RNScreensPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.horcrux.svg.SvgPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements SdStateChangeListener,  ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNScreensPackage(),
            new RNCMaskedViewPackage(),
            new SvgPackage(),
            new SafeAreaContextPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(), new SmiSdkReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
SmiSdk.initSponsoredData(getResources().getString(R.string.smisdk_apikey), 
this, null, R.mipmap.ic_launcher,
getResources().getBoolean(R.bool.smisdk_show_messaging),
Arrays.asList(getResources().getStringArray(R.array.smisdk_exclusion_domin)));
    SoLoader.init(this, /* native exopackage */ false);
  }
@Override 
 public void onChange(SmiResult smiResult) {
 SmiSdkReactModule.setSmiResultToModule(smiResult);
}
}
