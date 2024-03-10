import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:razor_pay/core/app_export.dart';
import 'package:razor_pay/models/shared_preference.dart';
import 'package:razor_pay/presentation/product_quickview_screen/product_quickview_screen.dart';
import 'package:razor_pay/widgets/custom_button.dart';

class FoodProduct {
  final String name;
  final String cuisine;
  final String originalPrice;
  final String discountedPrice;
  final String rating;
  final String calories;
  final String description;
  final String url;

  FoodProduct({
    required this.name,
    required this.cuisine,
    required this.originalPrice,
    required this.discountedPrice,
    required this.rating,
    required this.calories,
    required this.description,
    required this.url,
  });

  factory FoodProduct.fromJson(Map<String, dynamic> json) {
    return FoodProduct(
        name: json['name'] ?? '',
        cuisine: json['cuisine'] ?? '',
        originalPrice: json['originalPrice'] ?? '',
        discountedPrice: json['discountedPrice'] ?? '',
        rating: json['rating'] ?? '',
        calories: json['calories'] ?? '',
        description: json['description'] ?? '',
        url: json['url'] ?? '');
  }
}

navigateScreen(BuildContext context, String namedata, String cuisinedata,
    String priceData, String DescriptionData, String imageURL) async {
  await PreferenceManager.saveData(
      namedata, cuisinedata, priceData, DescriptionData, imageURL);

  Navigator.push(context,
      MaterialPageRoute(builder: (context) => ProductQuickviewScreen()));
}

// ignore: must_be_immutable
class ListvectorsixtyoneItemWidget extends StatelessWidget {
  late FoodProduct foodProduct;

  ListvectorsixtyoneItemWidget(this.foodProduct);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => navigateScreen(
          context,
          foodProduct.name,
          foodProduct.cuisine,
          foodProduct.discountedPrice,
          foodProduct.description,
          foodProduct.url),
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 0,
        margin: EdgeInsets.all(0),
        color: ColorConstant.whiteA700,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadiusStyle.roundedBorder6,
        ),
        child: Container(
          height: getVerticalSize(
            302,
          ),
          width: getHorizontalSize(
            396,
          ),
          decoration: AppDecoration.outlineGray70011.copyWith(
            borderRadius: BorderRadiusStyle.roundedBorder6,
          ),
          child: Stack(
            alignment: Alignment.topLeft,
            children: [
              CustomImageView(
                svgPath: ImageConstant.imgVector61,
                height: getVerticalSize(
                  3,
                ),
                width: getHorizontalSize(
                  4,
                ),
                alignment: Alignment.topLeft,
                margin: getMargin(
                  top: 57,
                ),
              ),
              CustomImageView(
                svgPath: ImageConstant.imgVector61,
                height: getVerticalSize(
                  3,
                ),
                width: getHorizontalSize(
                  4,
                ),
                alignment: Alignment.topLeft,
                margin: getMargin(
                  top: 95,
                ),
              ),
              Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: getPadding(
                    bottom: 45,
                  ),
                  child: SizedBox(
                    width: getHorizontalSize(
                      361,
                    ),
                    child: Divider(
                      height: getVerticalSize(
                        1,
                      ),
                      thickness: getVerticalSize(
                        1,
                      ),
                      color: ColorConstant.gray200,
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.topCenter,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      height: getVerticalSize(
                        159,
                      ),
                      width: getHorizontalSize(
                        396,
                      ),
                      child: Stack(
                        alignment: Alignment.topLeft,
                        children: [
                          Image.asset(
                            foodProduct.url,
                            height: getVerticalSize(196),
                            width: getHorizontalSize(396),
                            fit: BoxFit.cover,
                          ),
                          Align(
                            alignment: Alignment.topLeft,
                            child: Padding(
                              padding: getPadding(
                                top: 22,
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        height: getVerticalSize(
                                          30,
                                        ),
                                        width: getHorizontalSize(
                                          108,
                                        ),
                                        margin: getMargin(
                                          top: 5,
                                        ),
                                        child: Stack(
                                          alignment: Alignment.centerLeft,
                                          children: [
                                            CustomImageView(
                                              imagePath:
                                                  ImageConstant.imgRectangle3,
                                              height: getVerticalSize(
                                                30,
                                              ),
                                              width: getHorizontalSize(
                                                108,
                                              ),
                                              alignment: Alignment.center,
                                            ),
                                            Align(
                                              alignment: Alignment.centerLeft,
                                              child: Padding(
                                                padding: getPadding(
                                                  left: 24,
                                                ),
                                                child: Text(
                                                  "RESCUED",
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  textAlign: TextAlign.left,
                                                  style: AppStyle
                                                      .txtGilroySemiBold12,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      CustomButton(
                                        height: getVerticalSize(
                                          24,
                                        ),
                                        width: getHorizontalSize(
                                          65,
                                        ),
                                        text: "30 min",
                                        margin: getMargin(
                                          left: 210,
                                          bottom: 11,
                                        ),
                                        prefixWidget: Container(
                                          margin: getMargin(
                                            right: 8,
                                          ),
                                          child: CustomImageView(
                                            svgPath: ImageConstant.imgClock,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    height: getVerticalSize(
                                      25,
                                    ),
                                    width: getHorizontalSize(
                                      81,
                                    ),
                                    margin: getMargin(
                                      top: 12,
                                    ),
                                    child: Stack(
                                      alignment: Alignment.center,
                                      children: [
                                        CustomImageView(
                                          imagePath:
                                              ImageConstant.imgRectangle3,
                                          height: getVerticalSize(
                                            25,
                                          ),
                                          width: getHorizontalSize(
                                            81,
                                          ),
                                          alignment: Alignment.center,
                                        ),
                                        Align(
                                          alignment: Alignment.center,
                                          child: Text(
                                            "50% off",
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.left,
                                            style: AppStyle.txtGilroySemiBold12,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Align(
                      alignment: Alignment.center,
                      child: Padding(
                        padding: getPadding(
                          left: 19,
                          top: 11,
                          right: 19,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  foodProduct.name,
                                  overflow: TextOverflow.ellipsis,
                                  textAlign: TextAlign.left,
                                  style: AppStyle.txtGilroySemiBold18,
                                ),
                                Padding(
                                  padding: getPadding(
                                    top: 7,
                                  ),
                                  child: Text(
                                    foodProduct.cuisine,
                                    overflow: TextOverflow.ellipsis,
                                    textAlign: TextAlign.left,
                                    style: AppStyle.txtGilroyRegular14,
                                  ),
                                ),
                                Padding(
                                  padding: getPadding(
                                    top: 8,
                                  ),
                                  child: Row(
                                    children: [
                                      Padding(
                                        padding: getPadding(
                                          top: 5,
                                          bottom: 5,
                                        ),
                                        child: Text(
                                          foodProduct.originalPrice as String,
                                          overflow: TextOverflow.ellipsis,
                                          textAlign: TextAlign.left,
                                          style: AppStyle.txtGilroyRegular12
                                              .copyWith(
                                            decoration:
                                                TextDecoration.lineThrough,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: getPadding(
                                          left: 12,
                                        ),
                                        child: Text(
                                          foodProduct.discountedPrice as String,
                                          overflow: TextOverflow.ellipsis,
                                          textAlign: TextAlign.left,
                                          style: AppStyle.txtGilroyBold20,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            Padding(
                              padding: getPadding(
                                bottom: 11,
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Container(
                                    margin: getMargin(
                                      left: 6,
                                    ),
                                    padding: getPadding(
                                      left: 8,
                                      top: 5,
                                      right: 8,
                                      bottom: 5,
                                    ),
                                    decoration:
                                        AppDecoration.fillGreen600.copyWith(
                                      borderRadius:
                                          BorderRadiusStyle.roundedBorder13,
                                    ),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          foodProduct.rating as String,
                                          overflow: TextOverflow.ellipsis,
                                          textAlign: TextAlign.left,
                                          style: AppStyle.txtGilroyBold12,
                                        ),
                                        CustomImageView(
                                          svgPath: ImageConstant.imgStar17,
                                          height: getSize(
                                            13,
                                          ),
                                          width: getSize(
                                            13,
                                          ),
                                          radius: BorderRadius.circular(
                                            getHorizontalSize(
                                              1,
                                            ),
                                          ),
                                          margin: getMargin(
                                            left: 8,
                                            top: 1,
                                            bottom: 1,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Padding(
                                    padding: getPadding(
                                      top: 24,
                                    ),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      children: [
                                        CustomImageView(
                                          svgPath: ImageConstant.img009fire2,
                                          height: getSize(
                                            14,
                                          ),
                                          width: getSize(
                                            14,
                                          ),
                                          margin: getMargin(
                                            top: 1,
                                            bottom: 1,
                                          ),
                                        ),
                                        Padding(
                                          padding: getPadding(
                                            left: 8,
                                          ),
                                          child: Text(
                                            foodProduct.calories as String,
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.left,
                                            style: AppStyle
                                                .txtGilroyRegular14Gray500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: getPadding(
                        left: 19,
                        top: 16,
                      ),
                      child: Text(
                        foodProduct.description,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.left,
                        style: AppStyle.txtGilroyRegular12Gray50001,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
