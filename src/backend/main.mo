import Array "mo:core/Array";

actor {
  type Product = {
    name : Text;
    tagline : Text;
    price : Nat;
    category : Text;
  };

  let products = [
    {
      name = "Beauty Soap";
      tagline = "Gentle cleansing with natural extracts";
      price = 700;
      category = "Cleansers";
    },
    {
      name = "Vitamin C Serum";
      tagline = "Brighten and rejuvenate your skin";
      price = 2500;
      category = "Serums";
    },
    {
      name = "Sunblock SPF 50+";
      tagline = "Ultimate protection against UV rays";
      price = 1800;
      category = "Sun Protection";
    },
    {
      name = "Rose Water";
      tagline = "Hydrate and refresh your skin";
      price = 550;
      category = "Toners";
    },
    {
      name = "Scrub Face Wash";
      tagline = "Exfoliate and cleanse for radiant skin";
      price = 1200;
      category = "Exfoliators";
    },
    {
      name = "Moisturizer Lotion";
      tagline = "Deep hydration for smooth, soft skin";
      price = 1600;
      category = "Moisturizers";
    },
  ];

  public query ({ caller }) func getAllProducts() : async [Product] {
    products;
  };
};
