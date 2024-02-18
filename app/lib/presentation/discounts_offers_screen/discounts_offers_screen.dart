import 'package:flutter/material.dart';
import 'package:razor_pay/core/utils/color_constant.dart';
import 'package:razor_pay/core/utils/image_constant.dart';
import 'package:razor_pay/core/utils/size_utils.dart';
import 'package:razor_pay/presentation/discounts_offers_screen/widgets/listvectorsixtyone_item_widget.dart';
import 'package:razor_pay/widgets/app_bar/appbar_image.dart';
import 'package:razor_pay/widgets/app_bar/appbar_title.dart';
import 'package:razor_pay/widgets/app_bar/custom_app_bar.dart';

class MenuScreen extends StatelessWidget {
  List<FoodProduct> foodProducts = [
    FoodProduct(
      name: 'Sushi',
      cuisine: 'Veg',
      originalPrice: "200",
      discountedPrice: "Rs.100",
      rating: "4.5",
      calories: " 145",
      description:
          'Sushi is a Japanese dish consisting of vinegared rice combined with other ingredients, including seafood, vegetables, and egg. It is typically served with soy sauce, wasabi, and pickled ginger.',
      url: ImageConstant.shellfish,
    ),

    FoodProduct(
        name: 'Vegan Buddha Bowl',
        cuisine: 'Jain',
        originalPrice: "244",
        discountedPrice: "Rs.122",
        rating: "4.5",
        calories: "145",
        description:
            'This vegan Buddha bowl is packed with roasted sweet potatoes, broccoli, and brown rice. It is topped with a creamy hummus dressing and fresh sprouts..',
        url: ImageConstant.burrito),
    FoodProduct(
        name: 'Farmhouse Pizza ',
        cuisine: 'Veg',
        originalPrice: "400",
        discountedPrice: "Rs.200.0",
        rating: "4.5",
        calories: " 145",
        description:
            "This pizza is loaded with fresh veggies, including mushrooms, onions, peppers, and tomatoes. It's a healthy and delicious option for vegetarians..",
        url: ImageConstant.pastaImg)

    // Add more FoodProduct objects as needed
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            backgroundColor: ColorConstant.gray50,
            appBar: CustomAppBar(
                height: getVerticalSize(48),
                leadingWidth: 40,
                leading: AppbarImage(
                    height: getSize(24),
                    width: getSize(24),
                    svgPath: ImageConstant.imgArrowleft,
                    margin: getMargin(left: 16, top: 13, bottom: 11),
                    onTap: () {
                      onTapArrowleft(context);
                    }),
                centerTitle: true,
                title: AppbarTitle(text: "Menu")),
            body: Padding(
                padding: getPadding(left: 16, top: 25, right: 16),
                child: ListView.separated(
                    shrinkWrap: true,
                    separatorBuilder: (context, index) {
                      return SizedBox(height: getVerticalSize(16));
                    },
                    itemCount: foodProducts.length,
                    itemBuilder: (context, index) {
                      // Return the list item widget for each food product
                      return ListvectorsixtyoneItemWidget(foodProducts[index]);
                    }))));
  }

  onTapArrowleft(BuildContext context) {
    Navigator.pop(context);
  }
}
