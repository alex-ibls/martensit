import AppKit
import Foundation

let width = 1200
let height = 630

guard let rep = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: width,
  pixelsHigh: height,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
) else {
  fatalError("bitmap")
}

rep.size = NSSize(width: width, height: height)

guard let ctx = NSGraphicsContext(bitmapImageRep: rep) else {
  fatalError("context")
}

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = ctx
ctx.imageInterpolation = .high
ctx.shouldAntialias = true

func color(_ hex: Int, alpha: CGFloat = 1) -> NSColor {
  NSColor(
    srgbRed: CGFloat((hex >> 16) & 0xFF) / 255,
    green: CGFloat((hex >> 8) & 0xFF) / 255,
    blue: CGFloat(hex & 0xFF) / 255,
    alpha: alpha
  )
}

func yFromTop(_ top: CGFloat, _ boxHeight: CGFloat) -> CGFloat {
  CGFloat(height) - top - boxHeight
}

color(0x111418).setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: width, height: height)).fill()

color(0x8FD4D4, alpha: 0.07).setFill()
NSBezierPath(rect: NSRect(x: 820, y: 0, width: 380, height: height)).fill()

color(0xC9A36A).setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: 14, height: height)).fill()
color(0x8FD4D4).setFill()
NSBezierPath(rect: NSRect(x: 14, y: 0, width: 5, height: height)).fill()

let mark = NSRect(x: 72, y: yFromTop(72, 56), width: 56, height: 56)
let markPath = NSBezierPath(roundedRect: mark, xRadius: 10, yRadius: 10)
color(0x0C0E10).setFill()
markPath.fill()
color(0xC9A36A, alpha: 0.8).setStroke()
markPath.lineWidth = 1
markPath.stroke()

let markFont = NSFont.systemFont(ofSize: 28, weight: .semibold)
let markText = NSAttributedString(string: "М", attributes: [
  .font: markFont,
  .foregroundColor: color(0xC9A36A),
])
let markSize = markText.size()
markText.draw(at: NSPoint(
  x: mark.midX - markSize.width / 2,
  y: mark.midY - markSize.height / 2
))

func draw(_ text: String, font: NSFont, color c: NSColor, x: CGFloat, top: CGFloat, width maxW: CGFloat, height boxH: CGFloat) {
  let para = NSMutableParagraphStyle()
  para.lineBreakMode = .byWordWrapping
  let attrs: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: c,
    .paragraphStyle: para,
  ]
  NSAttributedString(string: text, attributes: attrs).draw(
    with: NSRect(x: x, y: yFromTop(top, boxH), width: maxW, height: boxH),
    options: [.usesLineFragmentOrigin, .usesFontLeading]
  )
}

draw("Воронеж · по всей России", font: NSFont.systemFont(ofSize: 22, weight: .medium), color: color(0x8FD4D4), x: 72, top: 160, width: 700, height: 36)
draw("Мартенсит", font: NSFont.systemFont(ofSize: 76, weight: .semibold), color: color(0xF4F6F8), x: 72, top: 210, width: 900, height: 96)
draw("завод светопрозрачных конструкций", font: NSFont.systemFont(ofSize: 28, weight: .regular), color: color(0xC5CCD3), x: 72, top: 310, width: 800, height: 44)
draw("Производство и монтаж на алюминии и ПВХ. Замер, проектирование, сервис.", font: NSFont.systemFont(ofSize: 20, weight: .regular), color: color(0xA1A8B0), x: 72, top: 370, width: 720, height: 64)

let badge = "2 500–3 000 м² в месяц"
let badgeFont = NSFont.systemFont(ofSize: 20, weight: .medium)
let badgeText = NSAttributedString(string: badge, attributes: [
  .font: badgeFont,
  .foregroundColor: color(0xF5E6C8),
])
let badgeSize = badgeText.size()
let badgeRect = NSRect(
  x: 72,
  y: yFromTop(480, badgeSize.height + 22),
  width: badgeSize.width + 40,
  height: badgeSize.height + 22
)
let badgePath = NSBezierPath(roundedRect: badgeRect, xRadius: 999, yRadius: 999)
color(0xC9A36A, alpha: 0.16).setFill()
badgePath.fill()
color(0xC9A36A, alpha: 0.5).setStroke()
badgePath.lineWidth = 1
badgePath.stroke()
badgeText.draw(at: NSPoint(x: badgeRect.minX + 20, y: badgeRect.minY + 11))

NSGraphicsContext.restoreGraphicsState()

guard let jpeg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else {
  fatalError("jpeg")
}

let out = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "public/og/cover.jpg"
try jpeg.write(to: URL(fileURLWithPath: out))
print("wrote \(out) (\(jpeg.count) bytes)")
