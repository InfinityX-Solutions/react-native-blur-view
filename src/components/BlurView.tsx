import type {ReactNode} from 'react';
import React, {useRef} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

interface BlurViewProps {
  backgroundColor?: RGBA;
  blurRadius?: number;
  borderRadius?: number;
  children?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: ViewStyle;
}

const BlurView = ({
  backgroundColor = 'rgba(255, 255, 255, 0)',
  blurRadius = 3.5,
  borderRadius,
  children,
  contentContainerStyle,
  style,
  ...props
}: BlurViewProps) => {
  const webviewRef = useRef<WebView>(null);

  return (
    <View style={[styles.container, style]} {...props}>
      <WebView
        ref={webviewRef}
        style={styles.blur}
        originWhitelist={['*']}
        overScrollMode="never"
        scrollEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        source={{
          html: `
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0 maximum-scale=1.0" />
      <style>
        .blur {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          
          background: ${backgroundColor};
          
          -webkit-backdrop-filter: blur(${blurRadius}px);
          backdrop-filter: blur(${blurRadius}px);
          
          ${
            typeof borderRadius === 'number' &&
            `border-radius: ${borderRadius}px;`
          }
        }
      </style>
    </head>
    <body>
      <div class="blur" />
    </body>
  </html>
`,
        }}
      />
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  blur: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
export default BlurView;
