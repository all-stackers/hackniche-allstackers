import 'package:shared_preferences/shared_preferences.dart';

class PreferenceManager {
  static final String name = "name";
  static final String cuisine = "cuisine";
  static final String price = "price";
  static final String description = "description";
  static final String image = "image";

  //for worker type
  static Future<void> saveData(String namedata, String cuisinedata,
      String priceData, String DescriptionData, String imageURL) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString(name, namedata);
    await prefs.setString(cuisine, cuisinedata);
    await prefs.setString(price, priceData);
    await prefs.setString(description, DescriptionData);
    await prefs.setString(image, imageURL);

    print(prefs);
  }

  static Future<List<String?>> getData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    String? nameData = prefs.getString(name);
    String? cuisineData = prefs.getString(cuisine);
    String? priceData = prefs.getString(price);
    String? descriptionData = prefs.getString(description);
    String? imageData = prefs.getString(image);
    print(nameData);
    return [nameData, cuisineData, priceData, descriptionData, imageData];
  }
}
