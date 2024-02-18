import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:razor_pay/core/utils/color_constant.dart';
import 'package:razor_pay/core/utils/image_constant.dart';
import 'package:razor_pay/core/utils/size_utils.dart';
import 'package:razor_pay/presentation/discounts_offers_screen/discounts_offers_screen.dart';
import 'package:razor_pay/presentation/maps/markers.dart';
import 'package:razor_pay/presentation/post/create_post.dart';
import 'package:razor_pay/theme/app_style.dart';
import 'package:razor_pay/widgets/app_bar/appbar_image.dart';
import 'package:alan_voice/alan_voice.dart';
import 'package:razor_pay/widgets/app_bar/appbar_title.dart';
import 'dart:math';
import 'package:razor_pay/widgets/app_bar/custom_app_bar.dart';

class FoodTruckScreen extends StatefulWidget {
  @override
  State<FoodTruckScreen> createState() => _FoodTruckScreenState();
}

class _FoodTruckScreenState extends State<FoodTruckScreen> {
  _FoodTruckScreenState() {
    /// Init Alan Button with project key from Alan AI Studio
    AlanVoice.addButton(
        "27a47e26729240131b510e602e761dfc2e956eca572e1d8b807a3e2338fdd0dc/stage",
        buttonAlign: AlanVoice.BUTTON_ALIGN_RIGHT);

    /// Handle commands from Alan AI Studio
    AlanVoice.onCommand.add(
        (command) => {print(command.toString()), _handleCommand(command.data)});
  }

  void _handleCommand(Map<String, dynamic> command) {
    switch (command["command"]) {
      case "menu":
        print("Helloooooo");
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => MenuScreen(),
            ));
        break;
      case "maps":
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Markers(),
            ));
        break;
      case "post":
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => CreatePostScreen()),
        );
        break;
      default:
        print("Unknown Command");
    }
  }

  // Dummy list of food trucks
  final List<FoodTruck> foodTrucks = [
    FoodTruck(
      name: 'Tasty Tacos Truck',
      description: 'Description of Truck 1',
      imageUrl:
          'https://imgs.search.brave.com/8qFWNJ-muEdYTNytk2Qf86uAScy36ukqiKDuQ9ohwNI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MzMyNjA2ODIwMzUt/YjYyNzBhYjFiMzE0/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRoOGZH/WnZiMlFsTWpCMGNu/VmphM3hsYm53d2ZI/d3dmSHg4TUE9PQ.jpeg',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'Burger Bliss Mobile',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/h-Y5rDY4ni7ryZqj3zNcfwbBRRr-AXaY7LrK3ACSSNY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MzE1NDAyMjM1Mzct/OGYyZDQ5YTRhZDlk/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRKOGZH/WnZiMlFsTWpCMGNu/VmphM3hsYm53d2ZI/d3dmSHg4TUE9PQ.jpeg',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'Pizza Perfect Van',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/jtTSg6mqoCM6Ba5nY0vgIkQ8rlDIFWtqUVckBMrQeu0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDAzMzg0Mjc1MTAt/NWRlYjE3NTk4N2Qy/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZH/WnZiMlFsTWpCMGNu/VmphM3hsYm53d2ZI/d3dmSHg4TUE9PQ.jpeg',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'Sushi on Wheels',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/fs__HQRIXTux0GnJqMn6Via-zbvGmONXS2tTl2j4SQk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAzNzcx/OC8xODM4Mi9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE4MzgyNzc0/NC1zdG9jay1waG90/by1mb29kLXRydWNr/LWZlc3RpdmFsLmpw/Zw',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'BBQ Barn Truck',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/RkZrUaTW2j1Sp80KeRtD20-5lQi5_VUUg2yiO_KbR5o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTY3NDU4/Mi82MDEwL2kvNDUw/L2RlcG9zaXRwaG90/b3NfNjAxMDMzNTUt/c3RvY2stcGhvdG8t/Y3VzdG9tZXJzLW9y/ZGVyLW1lYWxzLWZy/b20tY29sb3JmdWwu/anBn',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'The Waffle Wagon',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/d-5pmK7UhgCt7CyYEuT6104QvwGY4Gd0_yadq4NaWrs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMzk3NzI0/Ny82OTcyL2kvNDUw/L2RlcG9zaXRwaG90/b3NfNjk3MjExODUt/c3RvY2stcGhvdG8t/d2hpdGUtYW5kLXJl/ZC12aW50YWdlLWZv/b2R0cnVjay5qcGc',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'Burrito Buggy',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/0XPb93JDYLHG9ddGeqvQoYaR523JpfOrcNky0D3W45Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjMwNDYw/MTAxNDgtMDNhMzVl/NzAwZDhmP3E9ODAm/dz0xMDAwJmF1dG89/Zm9ybWF0JmZpdD1j/cm9wJml4bGliPXJi/LTQuMC4zJml4aWQ9/TTN3eE1qQTNmREI4/TUh4elpXRnlZMmg4/Tlh4OFptOXZaQ1V5/TUhSeWRXTnJmR1Z1/ZkRCOGZEQjhmSHd3.jpeg',
      time: '${Random().nextInt(6) + 15} min',
    ),
    FoodTruck(
      name: 'Ice Cream Cruiser',
      description: 'Description of Truck 2',
      imageUrl:
          'https://imgs.search.brave.com/RkZrUaTW2j1Sp80KeRtD20-5lQi5_VUUg2yiO_KbR5o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTY3NDU4/Mi82MDEwL2kvNDUw/L2RlcG9zaXRwaG90/b3NfNjAxMDMzNTUt/c3RvY2stcGhvdG8t/Y3VzdG9tZXJzLW9y/ZGVyLW1lYWxzLWZy/b20tY29sb3JmdWwu/anBn',
      time: '${Random().nextInt(6) + 15} min',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorConstant.gray50,
      appBar: CustomAppBar(
        height: getVerticalSize(48),
        leadingWidth: 40,
        leading: AppbarImage(
          height: getSize(24),
          width: getSize(24),
          svgPath: ImageConstant.imgArrowleft,
          margin: getMargin(left: 16, top: 13, bottom: 11),
          onTap: () {},
        ),
        centerTitle: true,
        title: AppbarTitle(text: "Food Trucks"),
      ),
      body: SingleChildScrollView(
        child: Stack(
          children: [
            // Image Container
            Container(
              width: MediaQuery.of(context).size.width,
              height: getVerticalSize(400),
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(ImageConstant.imgHome),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            // Positioned Search Bar
            Positioned(
              top: 20, // Adjust the top position as needed
              left: 16,
              right: 16,
              child: Container(
                height: getVerticalSize(48),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        decoration: InputDecoration(
                          hintText: 'Search...',
                          contentPadding: EdgeInsets.symmetric(horizontal: 16),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: Icon(Icons.search),
                      onPressed: () {
                        // Add your search functionality here
                      },
                    ),
                  ],
                ),
              ),
            ),
            // Food Trucks List
            Container(
              margin: EdgeInsets.only(
                  top: getVerticalSize(
                      420)), // Adjust the margin top to match the bottom of the search bar
              padding: EdgeInsets.fromLTRB(16, 20, 16, 0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(40),
                  topRight: Radius.circular(40),
                ),
                color: Color.fromARGB(255, 255, 254, 255),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Text(
                      'Near You',
                      overflow: TextOverflow.ellipsis,
                      textAlign: TextAlign.center,
                      style: AppStyle.trucks,
                    ),
                  ),
                  Container(
                    height: 1,
                    width: 200,
                    margin: EdgeInsets.only(bottom: 10),
                    color: const Color.fromARGB(255, 216, 210, 210),
                  ),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 0,
                      mainAxisSpacing: 0,
                    ),
                    itemCount: (foodTrucks.length / 2).ceil(),
                    itemBuilder: (context, rowIndex) {
                      return Column(
                        children: [
                          Flexible(
                            child: TruckWidget(
                              foodTruck: foodTrucks[rowIndex * 2],
                            ),
                          ),
                          if (rowIndex * 2 + 1 < foodTrucks.length)
                            Flexible(
                              child: Container(
                                child: TruckWidget(
                                  foodTruck: foodTrucks[rowIndex * 2 + 1],
                                ),
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TruckWidget extends StatelessWidget {
  final FoodTruck foodTruck;

  const TruckWidget({Key? key, required this.foodTruck}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => {push(context)},
      child: ClipRRect(
        borderRadius:
            BorderRadius.circular(20), // Adjust the border radius as needed
        child: Card(
          child: SizedBox(
            height: 400,
            width: 300, // Set the width of each card
            child: Stack(
              fit: StackFit.expand,
              children: [
                // Image
                CachedNetworkImage(
                  imageUrl: foodTruck.imageUrl,
                  placeholder: (context, url) => CircularProgressIndicator(),
                  errorWidget: (context, url, error) => Icon(Icons.error),
                  fit: BoxFit.fill,
                ),
                // Text at bottom
                Positioned(
                  left: 0,
                  right: 0,
                  bottom: 0,
                  child: Container(
                    color: Colors.black
                        .withOpacity(0.5), // Adjust the opacity as needed
                    padding: EdgeInsets.symmetric(vertical: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Truck name
                        Text(
                          foodTruck.name,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle
                              .greyTextTrucks, // Adjust text style as needed
                        ),
                        // Time icon and text
                        Row(
                          children: [
                            Icon(
                              Icons.access_time,
                              color: Colors.white,
                            ),
                            SizedBox(width: 4), // Add some spacing
                            Text(
                              foodTruck.time,
                              style: AppStyle
                                  .txtGilroyMedium16, // Adjust text style as needed
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class FoodTruck {
  final String name;
  final String description;
  final String imageUrl;
  final String time;

  FoodTruck(
      {required this.name,
      required this.description,
      required this.imageUrl,
      required this.time});
}

push(BuildContext context) {
  Navigator.push(
      context, MaterialPageRoute(builder: (context) => MenuScreen()));
}
