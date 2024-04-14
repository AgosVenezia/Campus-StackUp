// Generated by view binder compiler. Do not edit!
package com.circle.w3s.sample.wallet.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.circle.w3s.sample.wallet.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class InitialiseAccountBinding implements ViewBinding {
  @NonNull
  private final ScrollView rootView;

  @NonNull
  public final TextView circleHeader3;

  @NonNull
  public final ProgressBar createWalletProgressBar;

  @NonNull
  public final ImageView logoimageView2;

  @NonNull
  public final Button nextButton;

  @NonNull
  public final TextView statusTextView;

  private InitialiseAccountBinding(@NonNull ScrollView rootView, @NonNull TextView circleHeader3,
      @NonNull ProgressBar createWalletProgressBar, @NonNull ImageView logoimageView2,
      @NonNull Button nextButton, @NonNull TextView statusTextView) {
    this.rootView = rootView;
    this.circleHeader3 = circleHeader3;
    this.createWalletProgressBar = createWalletProgressBar;
    this.logoimageView2 = logoimageView2;
    this.nextButton = nextButton;
    this.statusTextView = statusTextView;
  }

  @Override
  @NonNull
  public ScrollView getRoot() {
    return rootView;
  }

  @NonNull
  public static InitialiseAccountBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static InitialiseAccountBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.initialise_account, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static InitialiseAccountBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.circleHeader3;
      TextView circleHeader3 = ViewBindings.findChildViewById(rootView, id);
      if (circleHeader3 == null) {
        break missingId;
      }

      id = R.id.createWalletProgressBar;
      ProgressBar createWalletProgressBar = ViewBindings.findChildViewById(rootView, id);
      if (createWalletProgressBar == null) {
        break missingId;
      }

      id = R.id.logoimageView2;
      ImageView logoimageView2 = ViewBindings.findChildViewById(rootView, id);
      if (logoimageView2 == null) {
        break missingId;
      }

      id = R.id.nextButton;
      Button nextButton = ViewBindings.findChildViewById(rootView, id);
      if (nextButton == null) {
        break missingId;
      }

      id = R.id.statusTextView;
      TextView statusTextView = ViewBindings.findChildViewById(rootView, id);
      if (statusTextView == null) {
        break missingId;
      }

      return new InitialiseAccountBinding((ScrollView) rootView, circleHeader3,
          createWalletProgressBar, logoimageView2, nextButton, statusTextView);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}