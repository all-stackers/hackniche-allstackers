import 'package:flutter/material.dart';
import 'package:razor_pay/presentation/bottombar/bottombar.dart';
import 'package:razor_pay/presentation/product_quickview_screen/product_quickview_screen.dart';
import 'package:razor_pay/presentation/app_navigation_screen/app_navigation_screen.dart';

class AppRoutes {
  static const String discountsOffersScreen = '/discounts_offers_screen';

  static const String productQuickviewScreen = '/product_quickview_screen';
  static const String bottomBar = '/bottombar';

  static const String shoppingCartScreen = '/shopping_cart_screen';

  static const String appNavigationScreen = '/app_navigation_screen';

  static Map<String, WidgetBuilder> routes = {
    bottomBar: (context) => BottomBar(),
    productQuickviewScreen: (context) => ProductQuickviewScreen(),
    appNavigationScreen: (context) => AppNavigationScreen()
  };
}
