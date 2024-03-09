import { Color, Gradient, createColor } from "../Nodes/Color";

function C(num: number) {
  num >>>= 0;
  var b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return createColor(r / 255, g / 255, b / 255, 1);
}
export type ColorPalette = Array<Color>;
export type PaletteCollection = { [key: string]: ColorPalette };
export type GradientCollection = { [key: string]: Gradient };

export function createGradientFromPalette(palette: ColorPalette): Gradient {
  return palette.map((color, i) => ({
    pos: i / (palette.length - 1),
    color,
  }));
}

export const DefaultPalettes: PaletteCollection = {
  Pico8: [C(0x000000), C(0x1d2b53), C(0x7e2553), C(0x008751), C(0xab5236), C(0x5f574f), C(0xc2c3c7), C(0xfff1e8), C(0xff004d), C(0xffa300), C(0xffec27), C(0x00e436), C(0x29adff), C(0x83769c), C(0xff77a8), C(0xffccaa)],
  Twilight5: [C(0x292831), C(0x333f58), C(0x4a7a96), C(0xee8695), C(0xfbbbad)],
  Rose: [C(0x277256), C(0xa8d889), C(0xf34481), C(0xfccbca), C(0xffeff3)],
  Watermelon: [C(0xc36864), C(0xff8482), C(0xb6c363), C(0xcee44a), C(0xf1ffa0)],
  Sable: [C(0xdaecf6), C(0xe7b961), C(0xbd7d33), C(0x9a5f3f), C(0x5a2c1d)],
  Candy: [C(0xfff7f8), C(0xffa69e), C(0xff7e6b), C(0x8c5e58), C(0xa9f0d1)],
  Jungle: [C(0xe2e7d8), C(0xa7da63), C(0x614303), C(0xf58810), C(0xf24513)],
  Savana: [C(0x3b5166), C(0xfff275), C(0xff8c42), C(0xff3c38), C(0xa23e48)],
  Portal: [C(0xd5dbeb), C(0x0082c4), C(0x005ddf), C(0xf07716), C(0xee7f1b)],
  Peach: [C(0xf8f4d7), C(0xf4dec2), C(0xf4b36c), C(0xe98977), C(0xf2b4a8)],
  Poppies: [C(0xede8e2), C(0xc7d477), C(0x4a362a), C(0xcf1717), C(0xf97b5f), C(0xd3d3b2)],
  Ocean: [C(0xe8dbd7), C(0xd4d8e7), C(0xd4d8e7), C(0x46a4c4), C(0x3066ac), C(0xc24540)],
  Strawberry: [C(0x6bb053), C(0x185f27), C(0xca233d), C(0xae192c), C(0x6e202e)],
  Pink: [C(0xf4ebba), C(0xf4e0b5), C(0xf0b5b3), C(0xf6839c), C(0xfe64a3)],
  Cobacabana: [C(0xa44c89), C(0xff4b54), C(0xff7f42), C(0xfeb13b)],
  Banana: [C(0xd1ff79), C(0xff2b3a), C(0x971c30), C(0x51132a)],
  Marine: [C(0xf8f5e3), C(0x002746), C(0x174e79), C(0xe57525), C(0x614735)],
  Baobab: [C(0x86ac81), C(0xffd2b2), C(0xd25a59), C(0x6a2e4d)],
  Jeans: [C(0x407ba5), C(0x253447), C(0xe0634d), C(0x7e462b), C(0xfcfcfc)],
  Blue: [C(0xedeef3), C(0x0000c0), C(0x333ea2), C(0x93b3ed), C(0x000095), C(0x155cbd), C(0x7db3fb), C(0x7db3fb)],
  Flower: [C(0xfac6d0), C(0xef8c8d), C(0xfdf494), C(0x709255), C(0x416d05)],
  Tired: [C(0xa76b81), C(0xe9dde0), C(0xa093a6), C(0x67687e), C(0x4a535f)],
  Sumer: [C(0xc8cf7f), C(0xeee099), C(0xf7efc2), C(0xfcbf89), C(0xff7280)],
  Beach: [C(0xfffacc), C(0xffebba), C(0xffd0b5), C(0xffb2b2), C(0x6dc9c9), C(0xa5d8d8)], //Oh my go,
  Apple: [C(0xc59570), C(0xd8b39a), C(0xefefc3), C(0xdee58a), C(0xc3e54a)],
  Underwater: [C(0xd6f6b4), C(0xa9e899), C(0x44a682), C(0x467d7f), C(0x376d6d)],
  Sunset: [C(0xffe054), C(0xfebc68), C(0xf18f86), C(0xc56d9d), C(0x9967a4)],
  Soft: [C(0xe1f4fa), C(0xc8edff), C(0xd2cffe), C(0xf0cafd), C(0xfdd8ea)],
  Queen: [C(0xc01820), C(0xd83840), C(0xf05860), C(0x981060), C(0x700040)],
  Decay: [C(0x504040), C(0x908088), C(0xb0a8b8), C(0xd8d0e0), C(0xc04850), C(0x803840)],
  Used: [C(0xb1b26a), C(0x8d824a), C(0x63382d), C(0xd28455), C(0xf4d5a0)],
  Purple: [C(0x6180d6), C(0x82a4fd), C(0xf4aff1), C(0xbc7cdb), C(0x484374)],
  SnowWhite: [C(0x681514), C(0x921911), C(0xc1e7f5), C(0x72caf1), C(0x49b7ec)],
  Sahara: [C(0x8b2a0e), C(0x993513), C(0xbb5026), C(0xf88339), C(0xa6c6f5)],
  Island: [C(0x5b2a1f), C(0xbd7050), C(0xa5a570), C(0xc1ddf1), C(0x8bb2db)],
  StaryNight: [C(0x0f1724), C(0x12232d), C(0x222a37), C(0x394144), C(0x564d42)],
  Playfull: [C(0xbb95b7), C(0xe4a4b0), C(0xfcc1ae), C(0xf2eeae), C(0x6fc6ca)],
  Pirate: [C(0x4e1e22), C(0x902d23), C(0x0d3f2d), C(0x051e33), C(0x000524)],
  Vegas: [C(0x271a22), C(0x34222d), C(0x9f9cd9), C(0x7673c2), C(0x26223d)],
  ModernArt: [C(0x364b6f), C(0x3e658e), C(0xb7ac9f), C(0x5a4e31), C(0x443f28)],
  Sweden: [C(0x25778d), C(0x7dacc1), C(0xd69037), C(0xbd7632), C(0x8e512a)],
  California: [C(0x38355b), C(0x70608b), C(0xd8678c), C(0xf37571), C(0xe99687)],
  Moon: [C(0x051e3f), C(0x193056), C(0x445273), C(0x9a899a), C(0xb9a6aa)],
  Nut: [C(0x7c6743), C(0xffea7c), C(0xd0db6b), C(0xa8bc58), C(0x88964e)],
  Neon: [C(0xe032a0), C(0xee2afd), C(0xba3afc), C(0x7c62fc), C(0x5d8afc), C(0x50abfd)],
  Atmospher: [C(0xf88fe8), C(0xfe75e1), C(0xea31cd), C(0x701ea4), C(0x3d2190)],
  Ice: [C(0x008be3), C(0x3ba7f5), C(0x70bffe), C(0x9cd1ff), C(0xbae1fe)],
  Emerald: [C(0x061b11), C(0x022601), C(0x265902), C(0x65a603), C(0x97d602)],
  Geometric: [C(0x4a4759), C(0xd99484), C(0xf2bc8d), C(0xd9cc8b), C(0x0e0e0e)],
  Road: [C(0xaba9d9), C(0xd2b7bc), C(0x94b7b8), C(0x44a69c), C(0x188c77)],
  Blueberry: [C(0x1a243f), C(0x3c5880), C(0x7b97be), C(0x836871), C(0x7b3438)],
  Pride: [C(0x750787), C(0x004dff), C(0x008026), C(0xffed00), C(0xff8c00), C(0xe40303)],
  YourName: [C(0x0c1030), C(0x085888), C(0x88cde4), C(0x38478c), C(0x5d2c74), C(0x8e5d87), C(0x3b3c81)],
  Urban: [C(0x70c3c7), C(0x7db3cd), C(0x608099), C(0x728d7c), C(0xb4adcc), C(0xdcc2a7)],
  Estrella: [C(0x3a3462), C(0x4d577a), C(0x6e1e53), C(0xe8ab96), C(0xf3c3b9), C(0xefa7bb)],
  RPG: [C(0x7cb4d5), C(0x7fc8d1), C(0x294644), C(0x507446), C(0xd3bb8b), C(0x924440)],
  Firewatch: [C(0xffd5a3), C(0xfd9d33), C(0xb44633), C(0x6a202d), C(0x46152a), C(0x311126)],
  GrandBudapest: [C(0x76504f), C(0xe29988), C(0xeb7d80), C(0xb98e87), C(0x514859), C(0x527a86)],
  Sand: [C(0x5f6a91), C(0xd76a54), C(0xfceebc), C(0x3b3f5a), C(0xf6c749)],
  Venon: [C(0x684266), C(0x442f56), C(0x333559), C(0x2a354c), C(0x434d60)],
  Ceramique: [C(0x112625), C(0x445c56), C(0x889f8a), C(0xccd6d1), C(0xd5cfc1), C(0xece2de)],
  Cherry: [C(0xba2f27), C(0x441825), C(0x6a89b1), C(0xc5c4d6), C(0xddd7e3), C(0xeae3e4)],
  Wild: [C(0x687db6), C(0x46425d), C(0x515648), C(0xd58659), C(0xf2c285), C(0xe1ccde)],
  Towel: [C(0xd1eaaf), C(0xced071), C(0xced071), C(0xbc92a2), C(0xd8c3d1), C(0xc5c5c6)],
  Lavender: [C(0xf6dbe0), C(0xe7eee3), C(0xd3d3f2), C(0x7a7ad8), C(0x564fa7), C(0x705e8f)],
  Cacti: [C(0xece2de), C(0xd5cfc1), C(0xccd6d1), C(0x889f8a), C(0x445c56), C(0x112625)],
  Succulent: [C(0xd58568), C(0xdce0c3), C(0xbcd0b3), C(0x9cb6a8), C(0x577160), C(0x30402f)],
  Violet: [C(0xf3f1ef), C(0xdae2f8), C(0x7ab799), C(0x324942), C(0x593071), C(0xca74bb)],
  Dust: [C(0x687db6), C(0x46425d), C(0x515648), C(0xd58659), C(0xf2c285), C(0xe1ccde)],
  Limon: [C(0x87b083), C(0x2e503d), C(0xdfac5a), C(0xebd175), C(0xf0eea5), C(0xf1f9cf)],
  Coton: [C(0x98b686), C(0x786a73), C(0xab80b0), C(0xc6b0e4), C(0xdfcef7), C(0xf1f0ec)],
  Honey: [C(0xf7f6f3), C(0xefece6), C(0xeec791), C(0xcb7046), C(0x624f48), C(0xbca994)],
  Holliday: [C(0xb2eeee), C(0x7ed6da), C(0x3682bc), C(0x243c5c), C(0x324e51), C(0xb8ac7f)],
  Surreal: [C(0x7567b8), C(0x142235), C(0x31448f), C(0x468598), C(0x79c5c3), C(0xc5f7de)],
  Sweat: [C(0xb9d4f5), C(0x4e4689), C(0xd24b63), C(0xf4b698), C(0xeae69e), C(0xe4e2e2)],
  Signal: [C(0x0a1d3b), C(0x132f56), C(0xe5376a), C(0xf87b9b), C(0xf2f9ff)],
  Sugar: [C(0xf1e3d2), C(0xfe97be), C(0xe65b51), C(0x2a5f9e), C(0x6fb882)],
  Blessing: [C(0x74569b), C(0x96fbc7), C(0xf7ffae), C(0xffb3cb), C(0xd8bfd8)],
  SummerSky: [C(0x3062b8), C(0x589fc0), C(0x3a7ec9), C(0x78c5db), C(0xe2ded9), C(0xdcdcdc)],
  Curiosity: [C(0x020f75), C(0x15788c), C(0x00b9be), C(0xffeecc), C(0xffb0a3), C(0xff6973)],
  PastelQT: [C(0xff6973), C(0xe2a97e), C(0xf0cf8e), C(0xf6edcd), C(0xa8c8a6), C(0x6d8d8a), C(0x655057)],
  RetroCal: [C(0x6eb8a8), C(0x2a584f), C(0x74a33f), C(0xfcffc0), C(0xc6505a), C(0x2f142f), C(0x774448), C(0xee9c5d)],
};

export const DefaultGradient: GradientCollection = {
  King: createGradientFromPalette([C(0x1a2a6c), C(0xb21f1f), C(0xfdbb2d)]),
  Moonlit: createGradientFromPalette([C(0x0f2027), C(0x203a43), C(0x2c5364)]),
  WeddingDay: createGradientFromPalette([C(0x40e0d0), C(0xff8c00), C(0xff0080)]),
  Coral: createGradientFromPalette([C(0xff9966), C(0xff5e62)]),
  Afterglow: createGradientFromPalette([C(0x4158d0), C(0xc850c0), C(0xffcc70)]),
  Barbie: createGradientFromPalette([C(0xf4e784), C(0xf24389), C(0xa478f1)]),
  Sunset: createGradientFromPalette([C(0xfcc5e4), C(0xfda34b), C(0xff7882), C(0xc8699e), C(0x7046aa), C(0x0c1db8), C(0x020f75)]),
};
