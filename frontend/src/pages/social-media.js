"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/router";

const SocialMedia = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [socialMedia, setSocialMedia] = useState("instagram");
  const [instaHastag, setInstaHastag] = useState([]);
  const [textHashtag, setTextHashtag] = useState("");
  const [instaCaption, setInstaCaption] = useState("");
  const [istextHashtag, setIstextHashtag] = useState(false);
  const [finalHashtags, setFinalHashtags] = useState([]);
  const [captionLoading, setCaptionLoading] = useState(false);
  const [hashtagLoading, setHashtagLoading] = useState(false);
  const [twitterText, setTwitterText] = useState("");
  const [twitterHashtags, setTwitterHashtags] = useState([]);
  const [instaPosting, setInstaPosting] = useState(false);

  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const generateInstaCaption = () => {
    var formdata = new FormData();
    formdata.append("image", selectedImage);
    setCaptionLoading(true);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:5000/caption", requestOptions)
      .then(
        (response) => response.json()
        // setInstaCaption(response.data);
      )
      .then((result) => {
        console.log(result);
        setInstaCaption(result.data.caption);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setCaptionLoading(false));
  };

  const generateInstaHashtags = () => {
    var formdata = new FormData();
    formdata.append("image", selectedImage);
    formdata.append("text", instaCaption);
    setHashtagLoading(true);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:5000/hashtag", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const hashtag = [...instaHastag];
        result.data.forEach((tag) => hashtag.push(tag));
        setInstaHastag([...hashtag]);

        console.log(result.data.hashtags);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setHashtagLoading(false));
  };

  const addTextInput = () => {
    if (textHashtag.trim() !== "") {
      setInstaHastag([...instaHastag, textHashtag]);
      setFinalHashtags([...finalHashtags, textHashtag]);
      setTextHashtag("");
      setIstextHashtag(false);
    }
  };

  const toggleInputType = () => {
    setIstextHashtag(!istextHashtag);
    if (!istextHashtag) {
      setTextHashtag("");
    }
  };

  const generateTwitterHastags = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      text: twitterText,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/tweetHashtag", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setTwitterHashtags([...result.data]);
      })
      .catch((error) => console.log("error", error));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTextInput();
    }
  };

  const postClickHandler = () => {
    var formdata = new FormData();
    formdata.append("image", selectedImage);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    setInstaPosting(true);

    fetch("http://localhost:5000/cloudinary", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // iterate final hastags and add # to each
        finalHashtags.forEach((tag, index) => {
          finalHashtags[index] = "#" + tag;
        });

        const post_caption = instaCaption + " " + finalHashtags;
        console.log(post_caption);

        var raw = JSON.stringify({
          media_type: "IMAGE",
          media_url: result.data,
          caption: post_caption,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:5000/instagramUpload", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            // push to instagram url
            router.push("https://www.instagram.com/allstackers/")
          })
          .catch((error) => console.log("error", error))
          .finally(() => setInstaPosting(false));
      })
      .catch((error) => console.log("error", error));

    // 2nd api call

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   "media_type": "IMAGE",
    //   "media_url": "https://media.publit.io/file/image-N9J.png",
    //   "caption": "Beach Day"
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:5000/instagramUpload", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  };

  return (
    <div className="flex">
      <div className="w-[65%] border-r-[1px] h-screen py-[20px]">
        <div className="w-full border-b-[1px] px-[20px]">
          <h1 className="text-2xl font-bold mb-4">Compose a new post</h1>
        </div>
        <Tabs className="py-[20px] px-[20px]" defaultValue="instagram">
          <TabsList className="bg-white py-[10px] gap-x-[20px]">
            <TabsTrigger
              className="border-[1px] rounded-full p-2"
              value="instagram"
              onClick={() => setSocialMedia("instagram")}
            >
              <img className="h-[30px]" src="assets/images/instagram.png" />
            </TabsTrigger>
            {/* <TabsTrigger
              className="border-[1px] rounded-full p-2"
              value="twitter"
              onClick={() => setSocialMedia("twitter")}
            >
              <img className="h-[30px]" src="assets/images/twitter.png" />
            </TabsTrigger> */}
            {/* <TabsTrigger
              className="border-[1px] rounded-full p-2"
              value="youtube"
              onClick={() => setSocialMedia("youtube")}
            >
              <img className="h-[30px]" src="assets/images/youtube.png" />
            </TabsTrigger> */}
          </TabsList>
          <div className="py-[10px]">
            <TabsContent className="py-[10px]" value="instagram">
              <Tabs defaultValue="image">
                  <div className="flex p-[10px] border rounded-[10px] h-fit py-[10px]">
                    <div className="flex flex-col px-[10px] w-full">
                      {!selectedImage ? (
                        <label className="mb-[10px] w-[200px] h-[200px] flex flex-col items-center justify-center px-4 py-6 rounded-lg shadow-md border cursor-pointer hover:border-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                            />
                          </svg>
                          <span className="mt-[10px]">Select an image</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      ) : (
                        <div className="flex flex-col items-end w-[100%]">
                          <button
                            onClick={handleDeleteImage}
                            className="relative p-[5px] rounded-full w-fit border bg-[white] top-10 mt-2 mr-2 text-gray-600 hover:text-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                              />
                            </svg>
                          </button>
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col border-l px-[10px]">
                      <div className="flex flex-col items-end">
                        <textarea
                          className="border border-gray-300 p-[10px] rounded-[10px] w-[300px] h-[140px] pb-[10px] box-border"
                          placeholder="Caption of Post"
                          value={instaCaption}
                          onChange={(e) => setInstaCaption(e.target.value)}
                        ></textarea>

                        {captionLoading ? (
                          <div className="relative top-[-40px] right-[15px]">
                            <ScaleLoader color="#3670FF" />
                          </div>
                        ) : (
                          <button
                            className="relative top-[-35px] text-[14px] border-red-400 border rounded-full px-[10px] bg-red-100 right-[10px]"
                            onClick={generateInstaCaption}
                          >
                            Generate caption
                          </button>
                        )}
                      </div>
                      <div className="rounded-lg border-dotted	border-[2px] border-red-300 py-[5px] px-[10px]">
                        <div className="flex justify-between">
                          <p className="text-[15px] font-bold">Hashtags</p>
                          {!hashtagLoading && (
                            <button
                              className="text-[14px] rounded-full border border-red-400 px-[10px] bg-red-100"
                              onClick={generateInstaHashtags}
                            >
                              Generate Hashtags
                            </button>
                          )}
                        </div>

                        <div className="py-[10px] rounded-[20px] bg-white">
                          {instaHastag.length == 0 && (
                            <em className="text-[14px] text-gray-600 font-light">
                              No Hashtag Added
                            </em>
                          )}

                          <div className="flex flex-wrap py-[5px] gap-x-[10px]">
                            {instaHastag.map((hashtag, index) => (
                              <button
                                className={`flex text-[14px] py-[2px] my-[5px] px-[5px] gap-x-[5px] rounded-lg border-[1px] ${
                                  finalHashtags.includes(hashtag) &&
                                  "border-red-400"
                                }`}
                                key={index}
                                onClick={() => {
                                  if (!finalHashtags.includes(hashtag)) {
                                    setFinalHashtags([
                                      ...finalHashtags,
                                      hashtag,
                                    ]);
                                  } else {
                                    const temp = [...finalHashtags];
                                    temp.splice(temp.indexOf(hashtag), 1);
                                    setFinalHashtags(temp);
                                  }
                                }}
                              >
                                <p className="text-blue-300">#{hashtag}</p>
                              </button>
                            ))}
                          </div>

                          <div className="py-[5px]">
                            {istextHashtag ? (
                              <input
                                className="border-[1px] text-[12px] rounded-lg px-[10px] py-[5px]"
                                type="text"
                                value={textHashtag}
                                onChange={(e) => setTextHashtag(e.target.value)}
                                placeholder="Hashtag"
                                onKeyPress={handleKeyPress}
                              />
                            ) : (
                              <button
                                onClick={toggleInputType}
                                className="flex py-[5px] text-[12px] font-bold px-[10px] gap-x-[5px] rounded-full border-[1px] border-gray-300"
                              >
                                Add Hashtag
                              </button>
                            )}
                          </div>
                        </div>
                        {hashtagLoading && (
                          <div className="py-[10px] rounded-[20px] bg-white ml-[120px]">
                            <ScaleLoader color="#3670FF" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] flex flex-row">
                    {!instaPosting ?
                      <button
                        className="w-[200px] h-[30px] rounded-md bg-red-200 ml-auto mt-[20px] border border-red-500"
                        onClick={postClickHandler}
                      >
                        Post
                      </button>
                    :
                      <div className="flex justify-center items-center w-[200px] h-[30px] rounded-md ml-auto mt-[20px] ">
                        <ScaleLoader color="#3670FF"/>
                      </div>
                    }
                  </div>
              </Tabs>
            </TabsContent>
            <TabsContent value="twitter">
              <div className="flex flex-col">
                <img
                  className="relative top-[40px] left-[10px] w-[30px]"
                  src="assets/images/twitter.png"
                ></img>
                <textarea
                  className="flex-grow w-full min-h-[250px] border-gray-300 border p-[10px] pl-[50px] rounded-[10px] "
                  placeholder="What is happening?!"
                  value={twitterText}
                  onChange={(e) => setTwitterText(e.target.value)}
                ></textarea>
                <div className="">
                  <div className="relative bottom-[100px] flex w-full p-[10px] px-[60px] gap-x-[10px]">
                    {twitterHashtags.map((tags, index) => (
                      <span key={index} className="text-blue-500">
                        {tags}
                      </span>
                    ))}
                  </div>

                  <div className="relative bottom-[90px] p-[10px] border-t flex gap-x-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <button
                      className="border border-red-400 bg-red-100 rounded-full px-[10px]"
                      onClick={generateTwitterHastags}
                    >
                      Generate Hashtags
                    </button>

                    <button className="border border-red-400 bg-red-100 rounded-full px-[10px]">
                      Generate Image
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="youtube">youtube</TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="p-[20px] w-[35%]">
        <div className="flex-col justify-center">
          <h1 className="text-xl font-bold">Live Post Preview</h1>
          <p className="text-gray-600 text-[14px]">
            Preview might slightly be different from the live post
          </p>
        </div>
        {socialMedia == "instagram" && (
          <div className="p-[10px] mt-[10px] border-[1px] shadow-md rounded-[10px]">
            <div className="flex items-center gap-x-[20px] px-[10px] py-[5px] border-b-[1px]">
              <img className="h-[30px]" src="assets/images/user.png"></img>
              <p className="font-bold">allstackers</p>
            </div>
            <div className="py-[10px] w-full">
              {!selectedImage ? (
                <div className="h-[250px]"></div>
              ) : (
                <img
                  className="w-[100%]"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                ></img>
              )}
            </div>
            <div>
              <div className="flex gap-x-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
              <div className="py-[10px]">
                <p>
                  {instaCaption.length > 0 ? (
                    instaCaption
                  ) : (
                    <em className="font-light">No Caption Added</em>
                  )}
                </p>
                <div className="flex flex-wrap py-[5px] gap-x-[10px]">
                  {finalHashtags.map((hashtag, index) => (
                    <div className="flex text-[14px] gap-x-[5px]" key={index}>
                      <p className="text-blue-300">#{hashtag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {socialMedia == "twitter" && (
          <div className="flex mt-[10px] p-[10px] border-[1px] shadow-md rounded-[10px]">
            <div className="items-center gap-x-[20px] px-[10px] py-[5px]">
              <img className="h-[30px]" src="assets/images/user.png"></img>
            </div>
            <div className="w-full">
              <div className="py-[5px]">
                <div className="flex gap-x-[10px]">
                  <h1 className="font-bold">All Stackets</h1>
                  <em className="font-light">@allstakers</em>
                </div>
                <div className="py-[10px] min-h-[100px]">
                  <p>
                    {twitterText.length > 0 ? (
                      twitterText
                    ) : (
                      <em className="font-light">No Content Added</em>
                    )}
                  </p>
                  <div className="flex flex-wrap py-[5px] gap-x-[10px]">
                    {finalHashtags.map((hashtag, index) => (
                      <div className="flex text-[14px] gap-x-[5px]" key={index}>
                        <p className="text-blue-300">#{hashtag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMedia;
