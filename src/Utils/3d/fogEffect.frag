uniform float maxRange;
uniform float minRange;
uniform vec4 colorEnd;
uniform vec4 colorStart;

float invMix(float edge0, float edge1, float x) {
    return ((x - edge0) / (edge1 - edge0));
}

void mainImage(
    const in vec4 inputColor,
    const in vec2 uv,
    const in float depth,
    out vec4 outputColor
) {
    float d = -getViewZ(depth);
    float c = invMix(minRange, maxRange, d);
    float t = clamp(c, 0.0, 1.0);

    //mix(inputColor, colorEnd, t);
    outputColor = mix(inputColor, mix(colorStart, colorEnd, t), t);
    //outputColor = colorEnd;
}
