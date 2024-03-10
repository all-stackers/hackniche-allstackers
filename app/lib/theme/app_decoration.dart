import 'package:flutter/material.dart';
import 'package:razor_pay/core/app_export.dart';

class AppDecoration {
  static BoxDecoration get outlineBluegray100 => BoxDecoration(
        color: ColorConstant.gray50,
        border: Border(
          bottom: BorderSide(
            color: ColorConstant.blueGray100,
            width: getHorizontalSize(
              1,
            ),
          ),
        ),
      );
  static BoxDecoration get fillGray50 => BoxDecoration(
        color: ColorConstant.gray50,
      );
  static BoxDecoration get outlineGray70011 => BoxDecoration(
        color: ColorConstant.whiteA700,
        boxShadow: [
          BoxShadow(
            color: ColorConstant.gray70011,
            spreadRadius: getHorizontalSize(
              2,
            ),
            blurRadius: getHorizontalSize(
              2,
            ),
            offset: Offset(
              0,
              0,
            ),
          ),
        ],
      );
  static BoxDecoration get fillGreen600 => BoxDecoration(
        color: ColorConstant.green600,
      );
  static BoxDecoration get outlineBlack9000c => BoxDecoration(
        color: ColorConstant.whiteA700,
        boxShadow: [
          BoxShadow(
            color: ColorConstant.black9000c,
            spreadRadius: getHorizontalSize(
              2,
            ),
            blurRadius: getHorizontalSize(
              2,
            ),
            offset: Offset(
              0,
              4,
            ),
          ),
        ],
      );
  static BoxDecoration get fillBlue50 => BoxDecoration(
        color: ColorConstant.blue50,
      );
  static BoxDecoration get fillWhiteA700 => BoxDecoration(
        color: ColorConstant.whiteA700,
      );
  static BoxDecoration get fillGray5001 => BoxDecoration(
        color: ColorConstant.gray5001,
      );
}

class BorderRadiusStyle {
  static BorderRadius roundedBorder6 = BorderRadius.circular(
    getHorizontalSize(
      6,
    ),
  );

  static BorderRadius roundedBorder13 = BorderRadius.circular(
    getHorizontalSize(
      13,
    ),
  );

  static BorderRadius roundedBorder10 = BorderRadius.circular(
    getHorizontalSize(
      10,
    ),
  );

  static BorderRadius roundedBorder1 = BorderRadius.circular(
    getHorizontalSize(
      1,
    ),
  );

  static BorderRadius customBorderBL10 = BorderRadius.only(
    bottomLeft: Radius.circular(
      getHorizontalSize(
        10,
      ),
    ),
    bottomRight: Radius.circular(
      getHorizontalSize(
        10,
      ),
    ),
  );
}

// Comment/Uncomment the below code based on your Flutter SDK version.

// For Flutter SDK Version 3.7.2 or greater.

double get strokeAlignInside => BorderSide.strokeAlignInside;

double get strokeAlignCenter => BorderSide.strokeAlignCenter;

double get strokeAlignOutside => BorderSide.strokeAlignOutside;

// For Flutter SDK Version 3.7.1 or less.

// StrokeAlign get strokeAlignInside => StrokeAlign.inside;
//
// StrokeAlign get strokeAlignCenter => StrokeAlign.center;
//
// StrokeAlign get strokeAlignOutside => StrokeAlign.outside;
