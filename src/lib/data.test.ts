import { describe, expect, it } from "vitest";
import { navLinks, sectionNumber } from "./data";
import { pad2, projectCode } from "./format";

describe("sectionNumber", () => {
  it("numbers sections by their navLinks order", () => {
    navLinks.forEach((link, i) => {
      expect(sectionNumber(link.href.slice(1))).toBe(pad2(i + 1));
    });
  });

  it("throws for a section missing from navLinks", () => {
    expect(() => sectionNumber("nope")).toThrow(/missing from navLinks/);
  });
});

describe("format helpers", () => {
  it("pads and builds project codes", () => {
    expect(pad2(3)).toBe("03");
    expect(pad2(12)).toBe("12");
    expect(projectCode(0)).toBe("P-01");
  });
});
