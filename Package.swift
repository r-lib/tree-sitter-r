// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterR",
    products: [
        .library(name: "TreeSitterR", targets: ["TreeSitterR"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterR",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                "src/scanner.c"
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterRTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterR",
            ],
            path: "bindings/swift/TreeSitterRTests"
        )
    ],
    cLanguageStandard: .c11
)
