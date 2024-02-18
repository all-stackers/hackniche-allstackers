import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:razor_pay/core/app_export.dart';
import 'package:razor_pay/models/shared_preference.dart';
import 'package:babylonjs_viewer/babylonjs_viewer.dart';
import 'package:razor_pay/presentation/payment/payment.dart';
import 'package:razor_pay/widgets/custom_button.dart';

class ProductQuickviewScreen extends StatefulWidget {
  @override
  State<ProductQuickviewScreen> createState() => _ProductQuickviewScreenState();
}

class _ProductQuickviewScreenState extends State<ProductQuickviewScreen> {
  late Future<List<String?>> dataFuture;

  @override
  void initState() {
    super.initState();
    dataFuture = PreferenceManager.getData();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: ColorConstant.gray50,
        body: FutureBuilder<List<String?>>(
          future: dataFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else {
              final data = snapshot.data!;
              return _buildContent(data, context);
            }
          },
        ),
      ),
    );
  }

  Widget _buildContent(List<String?> data, BuildContext context) {
    return SafeArea(
        child: Scaffold(
            backgroundColor: ColorConstant.gray50,
            body: Container(
                width: double.maxFinite,
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Container(
                          height: getVerticalSize(274),
                          width: double.maxFinite,
                          child: Stack(
                              alignment: Alignment.bottomCenter,
                              children: [
                                Align(
                                    alignment: Alignment.topCenter,
                                    child: Container(
                                        height: getVerticalSize(182),
                                        width: double.maxFinite,
                                        decoration: BoxDecoration(
                                            color: ColorConstant.blue50,
                                            borderRadius: BorderRadius.only(
                                                bottomLeft: Radius.circular(
                                                    getHorizontalSize(6)),
                                                bottomRight: Radius.circular(
                                                    getHorizontalSize(6)))))),
                                Align(
                                    alignment: Alignment.bottomCenter,
                                    child: Padding(
                                        padding:
                                            getPadding(left: 94, right: 94),
                                        child: Column(
                                            mainAxisSize: MainAxisSize.min,
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            children: [
                                              Container(
                                                height: 200,
                                                width: 200,
                                                color: Colors.transparent,
                                                child: BabylonJSViewer(
                                                  src: ImageConstant.pasta,
                                                ),
                                              ),
                                              CustomImageView(
                                                  svgPath:
                                                      ImageConstant.imgSwipe,
                                                  height: getVerticalSize(5),
                                                  width: getHorizontalSize(33),
                                                  margin: getMargin(top: 24))
                                            ])))
                              ])),
                      Align(
                          alignment: Alignment.center,
                          child: Padding(
                              padding: getPadding(left: 16, top: 32, right: 16),
                              child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(data[0] ?? 'Default Value',
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.left,
                                        style: AppStyle.txtGilroyBold28),
                                    Spacer(),
                                    CustomImageView(
                                        svgPath: ImageConstant.imgGoogle,
                                        height: getSize(30),
                                        width: getSize(30),
                                        margin: getMargin(bottom: 4),
                                        onTap: () {
                                          onTapImgGoogle(context);
                                        }),
                                    Padding(
                                        padding:
                                            getPadding(left: 15, bottom: 5),
                                        child: Text("1",
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.left,
                                            style: AppStyle.txtGilroyMedium24)),
                                    CustomImageView(
                                        svgPath: ImageConstant.imgFacebook,
                                        height: getSize(30),
                                        width: getSize(30),
                                        margin: getMargin(left: 16, bottom: 4),
                                        onTap: () {
                                          onTapImgFacebook(context);
                                        })
                                  ]))),
                      Padding(
                          padding: getPadding(left: 16, top: 13),
                          child: Text("Special price",
                              overflow: TextOverflow.ellipsis,
                              textAlign: TextAlign.left,
                              style: AppStyle.txtGilroyMedium20)),
                      Align(
                          alignment: Alignment.center,
                          child: Padding(
                              padding: getPadding(left: 16, top: 17, right: 16),
                              child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(data[2] ?? 'Default Value',
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.left,
                                        style: AppStyle.txtGilroyBold32),
                                    Padding(
                                        padding: getPadding(top: 7, bottom: 7),
                                        child: Text("(50% off)",
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.left,
                                            style: AppStyle.txtGilroyMedium20))
                                  ]))),
                      Padding(
                          padding: getPadding(left: 16, top: 37),
                          child: Text("Description",
                              overflow: TextOverflow.ellipsis,
                              textAlign: TextAlign.left,
                              style: AppStyle.txtGilroySemiBold20)),
                      Container(
                          width: getHorizontalSize(372),
                          margin: getMargin(left: 16, top: 12, right: 39),
                          child: Text(data[3] ?? 'Default Value',
                              maxLines: null,
                              textAlign: TextAlign.left,
                              style: AppStyle.txtGilroyRegular16)),
                      CustomButton(
                          height: getVerticalSize(50),
                          text: "Add To Cart",
                          onTap: () => {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => WebViewExample()))
                              },
                          margin: getMargin(
                              left: 16, top: 24, right: 16, bottom: 5),
                          variant: ButtonVariant.FillBlueA700,
                          padding: ButtonPadding.PaddingAll14,
                          fontStyle: ButtonFontStyle.GilroyMedium16,
                          alignment: Alignment.center)
                    ]))));
  }

  onTapImgGoogle(BuildContext context) async {
    var url = 'https://accounts.google.com/';
    if (!await launch(url)) {
      throw 'Could not launch https://accounts.google.com/';
    }
  }

  onTapImgFacebook(BuildContext context) async {
    var url = 'https://www.facebook.com/login/';
    if (!await launch(url)) {
      throw 'Could not launch https://www.facebook.com/login/';
    }
  }
}
