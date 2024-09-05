import XCTest
import SwiftTreeSitter
import TreeSitterR

final class TreeSitterRTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_r())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading R grammar")
    }
}
